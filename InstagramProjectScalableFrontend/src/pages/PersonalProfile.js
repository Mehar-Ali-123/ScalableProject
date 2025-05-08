import React, {useEffect, useState } from "react";
import profilePic from "../assets/images/unknownAvatar.png";
import iconCards from "../assets/images/icon-2.webp"; 
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { backend_url, server } from "../server"; 
import { toast } from "react-toastify";
import ErrorModal from "../components/ErrorModal";
import LoaderPage from "../components/Loader/LoaderPage";
function PersonalProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const dollarPerTon = 25;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(`${server}/get-profile-data`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const { user } = response.data;
        console.log(user);
        setUserData(user);
        setIsLoading(false);
      } catch (error) {
        if (
          (error.response &&
            error.response.status >= 500 &&
            error.response.status < 600) ||
          "Network Error"
        ) {
          navigate("/something-wrong");
        } else {
          if (
            error?.message == "Network Error" ||
            error?.data?.message == "500"
          ) {
            setErrorModalOpen(true);
          } else {
            console.error("Error fetching user data:", error);
            if (error) {
              toast.error("Please login to continue", {
                autoClose: 3000,
                style: {
                  marginTop: "100px",
                },
              });
            }
            setIsLoading(false);
          }
        }
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setErrorModalOpen(false);
  };

  // if (loading) {
  //   return <></>;
  // }

  const totalAmountKg = userData?.cnughtCreatedOrder.reduce((acc, obj) => {
    return acc + parseInt(obj.amount_kg || 0, 10); // ParseInt with base 10 to convert string to number
  }, 0);
  const roundedAmount = (totalAmountKg / 40 / 25 || 0).toFixed(3);

  const certificateUrl =
    userData?.cnughtCreatedOrder?.[userData.cnughtCreatedOrder.length - 1]
      ?.download_certificate;

  const customerRecentIdStripe =
    userData?.cnughtCreatedOrder?.[userData.cnughtCreatedOrder.length - 1]
      ?.stripe_customer_id;
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };
  const formatTableData = (data) => {
    return data?.cnughtCreatedOrder.map((order, index) => (
      <tr key={index}>
        <td className="px-0 py-4 text-center">
          {formatDate(order.created_on)}
        </td>
        <th
          scope="row"
          className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
        >
          {order.order_id || "null"}
        </th>
        <td className="px-0 py-4   text-center">
          {((order.amount_kg / 40 / 25) * dollarPerTon).toFixed(2)} $
        </td>
        <td className="px-2 py-4   text-center">{order.amount_kg} kg</td>
        <td className="text-center text-primary font-semibold tracking-wide">
          <Link
            to={order?.download_certificate}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </Link>
        </td>
      </tr>
    ));
  };

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }
      if (!customerRecentIdStripe) {
        throw new Error("Customer ID not found");
      }

      const response = await axios.post(
        `${server}/create-customer-portal-session`,
        {
          customerId: customerRecentIdStripe,
          returnUrl: "https://carbonshredder.com/personal-profile",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.url.startsWith("http")) {
        window.location.href = response.data.url;
      } else {
        navigate(response.data.url);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderPage />
      ) : (
        <div>
          <div className="bg-gray-100 mt-28">
            <div className="container mx-auto py-8">
              <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 lg:col-span-3">
                  <div className="bg-white hover:bg-[#0C0C0C] rounded-lg p-6">
                    <div className="flex flex-col items-center">
                      <img
                        src={
                          userData
                            ? `${backend_url}/${userData.avatar}`
                            : profilePic
                        }
                        className="object-cover w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                        alt="carbon-footprint-offset"
                      />

                      <h2 className="text-xl font-bold">
                        {userData ? userData.name : "Unknown"}
                      </h2>
                      <p className="text-gray-700">Carbon Shredder</p>
                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <Link
                          to={userData ? "/edit-profile" : "/sign-in"}
                          className="  text-white py-2 text-sm rounded-3xl w-44 text-center bg-primary px-4"
                        >
                          {userData ? "Edit Profile" : "Please Login"}
                        </Link>
                      </div>
                    </div>
                    <hr className="my-3 border-t border-gray-300" />
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-bold text-sm   text-center tracking-wider mb-2   ">
                        <span className="uppercase">
                          {" "}
                          Welcome to Your Carbon Impact Dashboard!
                        </span>
                        <p className="text-center text-sm mt-5  font-normal">
                          Your go-to space for tracking and visualising your
                          environmental footprint. Monitor your emissions, set
                          goals, and take actionable steps towards a greener
                          lifestyle. Start making a difference today!
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-9 lg:p-0">
                  <div className="flex justify-center md:justify-between gap-4 items-center  mb-6 flex-wrap">
                    <h1 className="md:text-[20px] leading-[30px] md:leading-[50px] text-start uppercase ">
                      Carbon Footprint
                    </h1>
                    <div className="flex items-center  justify-center md:justify-end gap-1 flex-wrap">
                      <button
                        onClick={handleManageBilling}
                        className="border-primary border-2 text-primary py-[7px] px-8 rounded-3xl hover:bg-primary hover:text-white w-full md:w-auto"
                      >
                        Manage billing
                      </button>
                      <Link
                        to={certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto"
                      >
                        <button className="border-primary border-2 text-primary py-[7px] px-8 rounded-3xl hover:bg-primary hover:text-white  w-full md:w-auto">
                          Download current certificate
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 gap-3">
                    <div className="bg-white hover:bg-[#0C0C0C] rounded-xl w-full h-[150px] p-4 flex flex-col justify-center items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 53.7 67.76"
                        id="house"
                      >
                        <path
                          d="M51,53.12a1,1,0,0,0,.83.45l.17,0c.19,0,4.67-.82,6-3.86,1.22-2.84-.35-7.77-.53-8.32a1,1,0,0,0-.56-.61,1,1,0,0,0-.82,0c-.53.24-5.14,2.5-6.37,5.34h0C48.41,49.16,50.91,53,51,53.12Zm.54-6.21h0c.62-1.43,2.82-2.91,4.34-3.77.43,1.69.88,4.32.26,5.76s-2.58,2.2-3.82,2.53C51.74,50.3,51,48.31,51.56,46.91Z"
                          transform="translate(-23.15 -16.12)"
                        ></path>
                        <path
                          d="M75.39,33.12,53.73,17a4.55,4.55,0,0,0-5.26-.11l-8,5.43v-.39a4,4,0,0,0-4-4h-2.4a1,1,0,0,0-1,1v8.4L24.74,33a3.61,3.61,0,0,0,2,6.59h1.1V78a.8.8,0,0,0,0,.15.78.78,0,0,0,0,.21,1.08,1.08,0,0,0,.11.18s0,.09.07.13l0,0h0a14.89,14.89,0,0,0,10.9,5.14,11.39,11.39,0,0,0,4.82-1,12.51,12.51,0,0,0,6.23-7,1,1,0,0,0,0-.76l0,.08h0a8.64,8.64,0,0,1,.76-6,8.29,8.29,0,0,1,1.72-2.2,15.76,15.76,0,0,0,1.82.1c2.12,0,5.39-.4,7.31-2.57,2.84-3.23,2.83-10.83,2.83-11.16a1,1,0,0,0-.34-.74,1,1,0,0,0-.79-.24c-.31,0-7.81,1-10.65,4.26-2.34,2.66-1.79,7-1.43,8.77a10.34,10.34,0,0,0-2.23,2.83,10.13,10.13,0,0,0-.71,1.65c-.33-.86-.59-1.49-.64-1.6A21.29,21.29,0,0,0,44,62.75c1.59-1.4,4.77-4.64,4.33-8.08-.55-4.3-7-9.24-7.27-9.45a1,1,0,0,0-1.39.18c-.54.68-5.29,6.75-4.75,11s5.91,6.63,7,7.11A19.61,19.61,0,0,1,46,69.08a39.2,39.2,0,0,1,2.16,6.31A10.62,10.62,0,0,1,43,81c-4.14,1.92-9.51.52-13.18-3.4v-38H69.54V78a1,1,0,0,0,2,0V39.62h1.7a3.61,3.61,0,0,0,2.15-6.5ZM54.28,57.9c1.64-1.86,5.81-3,8.25-3.41-.12,2.49-.67,6.79-2.3,8.65a6,6,0,0,1-3.58,1.71,7.29,7.29,0,0,0,1.14-.76,8.68,8.68,0,0,0,3-5.07,1,1,0,0,0-2-.39,6.77,6.77,0,0,1-2.32,3.91,6.67,6.67,0,0,1-3.12,1.37,1.17,1.17,0,0,0-.26.1C52.92,62.27,52.84,59.54,54.28,57.9ZM36.87,56.13c-.32-2.51,2.19-6.58,3.72-8.69,2,1.66,5.39,5,5.71,7.49.27,2.11-1.7,4.5-3.23,5.93a.94.94,0,0,0-.29-.42,6.19,6.19,0,0,1-2-2.83,5.83,5.83,0,0,1,.4-4.46,1,1,0,1,0-1.79-.9,7.84,7.84,0,0,0-.51,6,7.6,7.6,0,0,0,.83,1.69C38.32,58.93,37.06,57.61,36.87,56.13ZM50.08,75.05A.43.43,0,0,0,50,75v0A.48.48,0,0,1,50.08,75.05ZM35.09,20h1.4a2,2,0,0,1,2,2v1.75L35.09,26ZM74.76,36.52a1.56,1.56,0,0,1-1.52,1.1H26.76a1.6,1.6,0,0,1-.9-2.93L49.6,18.55A2.52,2.52,0,0,1,51,18.12a2.49,2.49,0,0,1,1.51.5L74.2,34.73A1.56,1.56,0,0,1,74.76,36.52Z"
                          transform="translate(-23.15 -16.12)"
                        ></path>
                      </svg>
                      <h2 className="text-2xl font-semibold tracking-wide">
                        {roundedAmount} tonne
                      </h2>
                      <span className="tracking-wide text-gray-600 text-sm">
                        Total CO2 offsets purchased
                      </span>
                    </div>
                    <div className="bg-white hover:bg-[#0C0C0C] rounded-xl w-full h-[150px] p-4 flex flex-col justify-center items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 64 64"
                        viewBox="0 0 64 64"
                        id="insurance"
                      >
                        <path d="M27 51h-5c-.552 0-1 .447-1 1v3c0 .553.448 1 1 1h5c.552 0 1-.447 1-1v-3C28 51.447 27.552 51 27 51zM26 54h-3v-1h3V54zM43.729 50.916l-1.459 1.367 2.25 2.4C44.709 54.886 44.974 55 45.25 55s.541-.114.729-.316l3.75-4-1.459-1.367-3.021 3.222L43.729 50.916z"></path>
                        <path
                          d="M35,4.114V4c0-1.654-1.346-3-3-3s-3,1.346-3,3v0.114C13.309,5.287,1,15.55,1,28c0,0.347,0.18,0.669,0.475,0.851
		c0.295,0.183,0.663,0.198,0.973,0.044l0.395-0.198c4.551-2.248,9.898-2.252,14.31-0.002l0.4,0.2
		c0.249,0.125,0.539,0.139,0.799,0.042l3.706-1.39c2.375-0.953,5.072-0.641,7.223,0.842L31,29.535V35H10c-0.552,0-1,0.447-1,1v22
		c0,0.553,0.448,1,1,1h30.834c1.203,1.382,2.732,2.657,4.636,3.848C45.632,62.949,45.816,63,46,63s0.368-0.051,0.53-0.152
		c4.832-3.021,7.335-6.559,7.877-11.131l0.586-4.944c0.062-0.522-0.292-1.004-0.809-1.101c-1.099-0.207-2.169-0.538-3.185-0.978V36
		c0-0.553-0.448-1-1-1H33v-5.42l2.65-1.514c0.036-0.021,0.07-0.043,0.104-0.068c1.628-1.22,4.109-1.33,6.924-0.334l2.928,1.255
		c0.225,0.096,0.477,0.108,0.71,0.029l3.664-1.223c2.816-1.104,6.412-0.943,9.843,0.43l1.783,0.764
		c0.309,0.134,0.664,0.101,0.944-0.084C62.831,28.649,63,28.336,63,28C63,15.55,50.691,5.287,35,4.114z M11,37h18v20H11V37z
		 M52.421,51.481c-0.452,3.811-2.439,6.709-6.421,9.331c-3.981-2.622-5.969-5.521-6.421-9.332L39.1,47.438
		c2.167-0.532,4.214-1.488,5.973-2.796L46,44.139l0.927,0.504c1.759,1.308,3.807,2.264,5.973,2.796L52.421,51.481z M49,43.616
		c-0.315-0.2-0.635-0.394-0.932-0.617c-0.039-0.029-0.08-0.056-0.122-0.078l-1.468-0.799c-0.298-0.162-0.658-0.162-0.956,0
		l-1.468,0.799c-0.042,0.022-0.083,0.049-0.122,0.078c-1.773,1.33-3.888,2.254-6.117,2.673c-0.517,0.097-0.871,0.578-0.809,1.101
		l0.586,4.943c0.23,1.937,0.835,3.679,1.796,5.284H31V37h5v4.777c0,0.357,0.19,0.688,0.5,0.866c0.31,0.178,0.691,0.178,1,0l2-1.155
		l2,1.155c0.155,0.089,0.328,0.134,0.5,0.134c0.172,0,0.345-0.045,0.5-0.134c0.31-0.179,0.5-0.509,0.5-0.866V37h6V43.616z M38,37h3
		v3.045l-1-0.578c-0.31-0.178-0.691-0.178-1.001,0l-1,0.578V37z M31,4c0-0.552,0.449-1,1-1s1,0.448,1,1v0.02
		C32.667,4.011,32.335,4,32,4s-0.667,0.011-1,0.02V4z M3.076,26.396C4.102,15.64,15.371,7.006,29.5,6.086l-5.843,5.843
		c-3.931,3.931-6.22,9.053-6.583,14.549C12.678,24.574,7.599,24.531,3.076,26.396z M30.402,26.733C28.74,25.587,26.808,25,24.872,25
		c-1.199,0-2.399,0.226-3.538,0.682l-2.262,0.848c0.348-4.981,2.434-9.622,5.999-13.187L31,7.414v19.718L30.402,26.733z
		 M34.606,26.359L33,27.277V7.414l5.929,5.929c3.547,3.547,5.631,8.158,5.995,13.11l-1.518-0.65
		C39.908,24.562,36.786,24.76,34.606,26.359z M60.589,26.308c-3.921-1.571-8.053-1.733-11.29-0.461l-2.365,0.788
		c-0.328-5.555-2.622-10.738-6.59-14.706L34.5,6.086c14.154,0.922,25.438,9.585,26.429,20.368L60.589,26.308z"
                        ></path>
                      </svg>
                      <h2 className="text-2xl font-semibold tracking-wide">
                        {(userData && userData.cnughtCreatedOrder?.length) ||
                          "0"}
                      </h2>
                      <span className="tracking-wide text-gray-600 text-sm">
                        Orders fulfilled
                      </span>
                    </div>
                    <div className="bg-white hover:bg-[#0C0C0C] rounded-xl w-full h-[150px] p-4 flex flex-col justify-center items-start gap-2">
                      <img
                        loading="lazy"
                        src={iconCards}
                        width={50}
                        height={50}
                        alt="carbon-footprint-offset"
                      />
                      <h2 className="text-2xl font-semibold tracking-wide">
                        {(userData &&
                          userData.cnughtCreatedOrder?.[
                            userData && userData.cnughtCreatedOrder.length - 1
                          ]?.amount_kg) ||
                          "0"}
                        kg
                      </h2>
                      <span className="tracking-wide text-gray-600 text-sm">
                        Current monthly CO2 estimate
                      </span>
                    </div>
                    <div className="bg-white hover:bg-[#0C0C0C] rounded-xl w-full h-[150px] p-4 flex flex-col justify-center items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 168 168"
                        id="dollar"
                      >
                        <circle
                          cx="2"
                          cy="150.289"
                          r="2"
                          fill="#2d4356"
                        ></circle>
                        <path
                          fill="#2d4356"
                          d="M11 148.28868H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4zM160 148.28868h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4z"
                        ></path>
                        <circle
                          cx="166"
                          cy="150.289"
                          r="2"
                          fill="#2d4356"
                        ></circle>
                        <path
                          fill="#0bceb2"
                          d="M118.15387 156.28868h-8.30774a2.00641 2.00641 0 0 0 0 4h8.30774a2.00641 2.00641 0 0 0 0-4zM58.15387 156.28868H49.84613a2.00641 2.00641 0 0 0 0 4h8.30774a2.00641 2.00641 0 0 0 0-4zM104 156.28868H64a2 2 0 0 0 0 4H79.94v2H72a2 2 0 0 0 0 4H97a2 2 0 0 0 0-4H88.06v-2H104a2 2 0 0 0 0-4zM84 35.28868a53 53 0 1 0 53 53A53 53 0 0 0 84 35.28868zm0 102a49 49 0 1 1 49-49A49.05551 49.05551 0 0 1 84 137.28868z"
                        ></path>
                        <path
                          fill="#2d4356"
                          d="M87.68469,79.11376c-3.79651-1.24792-8.52142-2.801-8.52142-4.36566,0-2.2312,4.01184-2.4046,5.24146-2.4046a12.80174,12.80174,0,0,1,8.57025,3.171l.05194.04932a9.0739,9.0739,0,0,0,6.2157,2.86072,8.34817,8.34817,0,0,0,8.37964-8.29718,8.65837,8.65837,0,0,0-1.48541-4.81592q-.0303-.04541-.06183-.09c-2.872-4.05664-7.72046-6.95642-13.86023-8.34576V55.53179a7.77015,7.77015,0,1,0-15.5401,0v1.24872C65.75427,59.34179,61.75684,67.48937,61.75684,74.7481c0,13.8797,11.7298,17.7547,20.29449,20.584,5.617,1.85571,9.29883,3.23145,9.29883,5.36157,0,1.29419,0,3.46021-6.94543,3.46021-3.73682,0-7.063-1.58582-10.468-4.99072a8.71262,8.71262,0,0,0-6.39606-2.95532,8.359,8.359,0,0,0-7.03485,12.77588c3.20313,5.18359,9.21674,9.16907,16.16882,10.8512v1.21057a7.77015,7.77015,0,1,0,15.5401,0v-1.106c10.43195-2.18774,16.54175-9.18823,16.54175-19.24585C108.75653,86.04021,96.07581,81.872,87.68469,79.11376Zm.53009,37.391v4.54077a3.77026,3.77026,0,1,1-7.5401,0v-4.54077c-7.86493-.97314-14.02588-5.18921-16.78162-9.64868a4.35915,4.35915,0,0,1,3.64764-6.64819,4.75293,4.75293,0,0,1,3.56769,1.78381c3.40527,3.40527,7.70251,6.16223,13.29633,6.16223,7.37775,0,10.94543-2.43335,10.94543-7.46021,0-11.83728-29.59332-6.40454-29.59332-25.94562,0-7.21533,4.53955-13.45874,14.91785-14.5943v-4.622a3.77026,3.77026,0,1,1,7.5401,0V60.235c6.48828.81073,11.83984,3.40527,14.59552,7.29773a4.68032,4.68032,0,0,1,.812,2.5946,4.344,4.344,0,0,1-4.37964,4.29718,5.37058,5.37058,0,0,1-3.48523-1.78381,16.74633,16.74633,0,0,0-11.35266-4.29724c-6.72809,0-9.24146,3.16168-9.24146,6.4046,0,10.62189,29.59326,5.67633,29.59326,25.94562C104.75653,109.6129,99.0802,115.45043,88.21478,116.50475Z"
                        ></path>
                        <path
                          fill="#2d4356"
                          d="M150.72131 148.28868H106.3009a64 64 0 1 0-44.60175 0H17.27869a2.017 2.017 0 1 0 0 4H150.72131a2.017 2.017 0 1 0 0-4zM24 88.28868a60 60 0 1 1 60 60A60.068 60.068 0 0 1 24 88.28868zM68.30471 8.28868a3 3 0 1 0-3-3A3.00344 3.00344 0 0 0 68.30471 8.28868zm0-4.5a1.5 1.5 0 1 1-1.5 1.5A1.50148 1.50148 0 0 1 68.30471 3.78868zM135.881 29.28868a2 2 0 1 0 2 2A2.00229 2.00229 0 0 0 135.881 29.28868zm0 3a1 1 0 1 1 1-1A1.001 1.001 0 0 1 135.881 32.28868zM135.881 1.71132a2 2 0 1 0 2 2A2.00229 2.00229 0 0 0 135.881 1.71132zm0 3a1 1 0 1 1 1-1A1.001 1.001 0 0 1 135.881 4.71132zM160 58.16207a2 2 0 1 0 2 2A2.00229 2.00229 0 0 0 160 58.16207zm0 3a1 1 0 1 1 1-1A1.001 1.001 0 0 1 160 61.16207zM31 30.28868a2 2 0 1 0-2 2A2.00229 2.00229 0 0 0 31 30.28868zm-3 0a1 1 0 1 1 1 1A1.001 1.001 0 0 1 28 30.28868z"
                        ></path>
                        <polygon
                          fill="#0bceb2"
                          points="10.888 69.3 12.375 67.344 11.436 66.813 10.481 69.003 10.45 69.003 9.48 66.828 8.525 67.376 9.996 69.285 9.996 69.316 7.695 69.018 7.695 70.082 10.011 69.785 10.011 69.817 8.525 71.725 9.416 72.289 10.434 70.082 10.465 70.082 11.404 72.273 12.39 71.71 10.888 69.832 10.888 69.801 13.25 70.082 13.25 69.018 10.888 69.331 10.888 69.3"
                        ></polygon>
                        <polygon
                          fill="#0bceb2"
                          points="5.734 6.942 4.878 8.041 5.392 8.365 5.978 7.095 5.996 7.095 6.536 8.356 7.104 8.032 6.239 6.951 6.239 6.933 7.599 7.095 7.599 6.482 6.239 6.662 6.239 6.644 7.095 5.518 6.555 5.212 6.005 6.473 5.987 6.473 5.429 5.221 4.878 5.536 5.726 6.636 5.726 6.654 4.401 6.482 4.401 7.095 5.734 6.924 5.734 6.942"
                        ></polygon>
                        <polygon
                          fill="#0bceb2"
                          points="164.724 17.31 164.724 16.267 162.407 16.573 162.407 16.543 163.866 14.625 162.945 14.103 162.009 16.251 161.977 16.251 161.027 14.118 160.089 14.655 161.533 16.528 161.533 16.558 159.276 16.267 159.276 17.31 161.548 17.019 161.548 17.05 160.089 18.921 160.964 19.474 161.963 17.31 161.992 17.31 162.913 19.459 163.881 18.906 162.407 17.065 162.407 17.034 164.724 17.31"
                        ></polygon>
                        <polygon
                          fill="#0bceb2"
                          points="106.758 16.231 108.016 14.576 107.222 14.126 106.414 15.979 106.387 15.979 105.567 14.139 104.759 14.603 106.004 16.218 106.004 16.244 104.057 15.993 104.057 16.893 106.017 16.641 106.017 16.668 104.759 18.283 105.513 18.76 106.374 16.893 106.4 16.893 107.195 18.746 108.029 18.27 106.758 16.681 106.758 16.654 108.757 16.893 108.757 15.993 106.758 16.257 106.758 16.231"
                        ></polygon>
                      </svg>
                      {/* <h2 className="text-2xl font-semibold tracking-wide">
                        {(
                          userData &&
                          (userData.cnughtCreatedOrder?.[
                            userData && userData.cnughtCreatedOrder.length - 1
                          ]?.amount_kg /
                            40 /
                            25) *
                            dollarPerTon
                        ) || "0"}
                        $
                      </h2> */}
                      <h2 className="text-2xl font-semibold tracking-wide">
                        {userData &&
                          userData.cnughtCreatedOrder &&
                          userData.cnughtCreatedOrder.length > 0 &&
                          userData.cnughtCreatedOrder[
                            userData.cnughtCreatedOrder.length - 1
                          ]?.amount_kg !== undefined &&
                          !isNaN(
                            userData.cnughtCreatedOrder[
                              userData.cnughtCreatedOrder.length - 1
                            ].amount_kg
                          )
                          ? (
                            (userData.cnughtCreatedOrder[
                              userData.cnughtCreatedOrder.length - 1
                            ].amount_kg /
                              40 /
                              25) *
                            dollarPerTon
                          ).toFixed(2)
                          : "0"}
                        $
                      </h2>
                      <span className="tracking-wide text-gray-600 text-sm">
                        Current plan
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex  justify-center md:justify-between items-center flex-col md:flex-row gap-5">
                    <p>
                      <span className="font-bold"> Issue Date : </span>
                      {(() => {
                        const createdOnString =
                          userData &&
                          userData.cnughtCreatedOrder?.[
                            userData && userData.cnughtCreatedOrder.length - 1
                          ]?.created_on;

                        if (!createdOnString) return "N/A"; // Handle missing date gracefully

                        const createdOnDate = new Date(createdOnString);
                        const day = createdOnDate.getDate();
                        const month = createdOnDate.getMonth() + 1;
                        const year = createdOnDate.getFullYear();
                        const formattedDate = `${day < 10 ? "0" : ""}${day}-${
                          month < 10 ? "0" : ""
                        }${month}-${year}`;
                        return formattedDate;
                      })()}
                    </p>
                    <p>
                      <span className="font-bold"> Expire Date : </span>
                      {(() => {
                        const createdOnString =
                          userData &&
                          userData.cnughtCreatedOrder?.[
                            userData && userData.cnughtCreatedOrder.length - 1
                          ]?.created_on;

                        if (!createdOnString) return "N/A"; // Handle missing date gracefully

                        const createdOnDate = new Date(createdOnString);
                        const expirationDate = new Date(
                          createdOnDate.getFullYear(),
                          createdOnDate.getMonth() + 1, // Increment month by 1 for next month
                          createdOnDate.getDate()
                        );
                        const day = expirationDate.getDate();
                        const month = expirationDate.getMonth() + 1;
                        const year = expirationDate.getFullYear();
                        const formattedDate = `${day < 10 ? "0" : ""}${day}-${
                          month < 10 ? "0" : ""
                        }${month}-${year}`;
                        return formattedDate;
                      })()}
                    </p>
                  </div> */}
                  <div className="relative overflow-x-auto mx-1  mb-20 mt-10 w-full md:w-auto">
                    <h2 className="md:text-[20px] leading-[30px] md:leading-[50px] text-start uppercase ">
                      Carbon Offsets History
                    </h2>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-5">
                      <thead className="text-xs text-gray-700 uppercase bg-[#FBB15F] ">
                        <tr>
                          <th
                            scope="col"
                            className="px-2 py-3 text-white text-center tracking-widest"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-white text-center tracking-widest"
                          >
                            Order id
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-white tracking-widest  text-center"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-white tracking-widest  text-center"
                          >
                            CO2/KG
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-white tracking-widest  text-center"
                          >
                            Certificate
                          </th>
                        </tr>
                      </thead>
                      <tbody>{formatTableData(userData)}</tbody>
                    </table>
                  </div>
                  {/* <div className="flex justify-center items-center  h-[250px]">
                    <img
                      className="h-full w-[250px] object-fill"
                      src={ProfileMain}
                      alt="profile main "
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <ErrorModal isOpen={errorModalOpen} closeModal={closeModal} />
        </div>
      )}
    </>
  );
}

export default PersonalProfile;
