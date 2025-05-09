import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoMobile from "../assets/images/footer-logo-2.png";
import Logo from "../assets/images/instalogo.png";
import { Menu } from "@headlessui/react";
import axios from "axios";
import { server } from "../server";
import LoaderPage from "./Loader/LoaderPage";
import MenuIcon from "../assets/icons/MenuIcon";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoginConfirmation, setShowLoginConfirmation] = useState(false);
  const [shredNavigate, setShredNavigate] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthentication");
  console.log(isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirmation(true);
    setIsOpen(false);
  };

  const handleStartShredding = () => {
    navigate("/watchandenjoy");
  };

  const confirmLogout = async () => {
    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }
      const response = await axios.post(`${server}/logout`);
      localStorage.setItem("isAuthentication", false);
      localStorage.setItem("authToken", "");
      localStorage.setItem("userName", "unknown");
      localStorage.setItem("userEmail", "unknown");
      if (response.status == 200) {
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoaderPage />
      ) : (
        <div>
          <header className="navbar change-color px-0 flex justify-between items-center ">
            <div className="container-fluid mx-0 flex flex-wrap p-3 flex-col md:flex-row items-center justify-between   w-[100%] py-0  ">
              <div className="  hidden lg:flex   container-fluid mx-0  flex-wrap p-3 flex-col md:flex-row items-center justify-between   w-[100%] py-1 ">
                <Link
                  to="/"
                  className="flex flex-col lg:flex-row title-font w-[165px]   items-center justify-center text-gray-900 mb-4 md:mb-0 gap-1 "
                >
                  <img
                    src={Logo}
                    className="w-[55px] h-[75px]  object-contain"
                    alt="carbon-footprint-offset-logo"
                  />
                </Link>
                <nav className="hidden lg:flex mx-auto   flex-col lg:flex-row   mt-3 lg:mt-0 lg:w-[59%] lg:items-center lg:justify-center ">
                  <Link
                    to="/"
                    className="mr-5  tracking-[2px] text-[14px] text-center text-gray-900 text-white hover:text-primary   hover:underline font-hel-bold  mx-0 px-0 font-hel-bold"
                  >
                    {/* <span className=" tracking-[2px] text-[14px] "> */}
                    Home
                    {/* </span> */}
                  </Link>
                  <Menu className="relative mr-5      text-center text-white hover:text-primary   hover:underline font-hel-bold flex flex-row items-center gap-1" as="div">
                    <Link to="/watchandenjoy">
                      <span className=" tracking-[2px] text-[14px] font-hel-bold">
                        Reels & Images
                      </span>
                    </Link>

                  </Menu>
                  {isAuthenticated == "true" &&
                    <Link
                      to="/upload-data"
                      className="mr-5   text-2xl md:text-[18px]   text-center "
                    >
                      <span className="text-white hover:text-primary   hover:underline font-hel-bold  tracking-[2px] text-[14px]">
                        Upload Data
                      </span>
                    </Link>
                  }
                  {isAuthenticated == "true" ? (
                    <Menu className="relative" as="div">
                      <Link>
                        <Menu.Button className="mr-5   text-2xl md:text-[18px]   text-center text-white hover:text-primary   hover:underline font-hel-bold flex flex-row items-center gap-1">
                          <span className="text-white hover:text-primary   hover:underline font-hel-bold  tracking-[2px] text-[14px]">
                            Dashboard
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Menu.Button>
                      </Link>
                      <Menu.Items
                        as="div"
                        className="absolute  bg-white flex flex-col w-64 p-3 rounded shadow-sm mt-2"
                      >
                        <Menu.Item>
                          <Link
                            to="/personal-profile"
                            className="   tracking-[2px] text-[12px] mx-5 my-2 text-primary  hover:underline font-hel-bold "
                          >
                            View Dashboard
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            onClick={handleLogout}
                            className="   tracking-[2px] text-[12px]  mx-5 my-2 text-primary  hover:underline font-hel-bold"
                          >
                            Logout
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  ) : (
                    <Link
                      to="/sign-in"
                      className="mr-5   tracking-[2px] text-[14px] text-center "
                    >
                      <span className=" text-white hover:text-primary   hover:underline font-hel-bold ">
                        Sign in
                      </span>
                    </Link>
                  )}
                </nav>
                <div className="w-[180px] flex justify-end">
                  <span onClick={handleStartShredding}>
                    <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-white hover:text-primary rounded-3xl text-md justify-center items-center">
                      Watch Now
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>

              <div className="   flex justify-between items-center w-[100%] lg:hidden">
                <div className="flex md:hidden  w-auto md:w-[20%]  justify-center">
                  <Link
                    to="/"
                    className="flex flex-col lg:flex-row title-font w-[100px]   items-center justify-center text-gray-900 mb-1 md:mb-0 gap-0 py-1 "
                  >
                    <img
                      loading="lazy"
                      src={Logo}
                      className="w-[45px] h-[65px]"
                      alt="carbon-footprint-offset"
                    />
                  </Link>
                </div>
                <div className=" flex md:hidden  w-[40%]  justify-end">
                  <button onClick={() => setIsOpen(!isOpen)}>
                    {/* <img loading="lazy"  src={menuicon} alt="Menu Icon" className="w-10  " /> */}
                    <MenuIcon />
                  </button>
                </div>

                <div className=" hidden md:flex  w-[40%]  justify-start">
                  <button onClick={() => setIsOpen(!isOpen)}>
                    {/* <img loading="lazy"  src={menuicon} alt="Menu Icon" className="w-10  " /> */}
                    <MenuIcon />
                  </button>
                </div>
                <div className="hidden md:flex  w-auto md:w-[20%]  justify-center">
                  <Link
                    to="/"
                    className="flex flex-col lg:flex-row title-font w-[160px]   items-center justify-center text-gray-900 mb-4 md:mb-0 gap-0 py-1 "
                  >
                    <img
                      loading="lazy"
                      src={Logo}
                      className="w-[55px] h-[75px] "
                      alt="carbon-footprint-offset"
                    />
                  </Link>
                </div>
                <div className="hidden md:flex justify-end w-[40%]  ">
                  <span onClick={handleStartShredding}>
                    <button className=" hidden md:flex   text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-white hover:text-primary rounded-3xl text-lg justify-center items-center">
                      Watch Now
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </span>
                </div>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: isOpen ? "#0C0C0C" : "transparent",
                    zIndex: 10000,
                    display: isOpen ? "flex" : "none",
                    justifyContent: "start",
                    alignItems: "start",
                  }}
                >
                  <Link
                    className="p-2 absolute text-start px-11 bg-[#FBF4DB] w-[100%] font-semibold text-[20px] flex justify-between items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="">Back</button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                  </Link>
                  <ul className="flex flex-col gap-5 md:gap-10 items-start p-10 w-[100%] mt-10">
                    <li
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-[#FBF4DB] p-2"
                    >
                      <Link
                        to="/"
                        className="   font-extrabold text-start text-white hover:text-primary   hover:underline font-hel-bold  tracking-[2px] text-[14px]"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="hover:bg-[#FBF4DB] p-2">
                      <Menu className="relative" as="div">
                        <Link to="">
                          <Menu.Button className="   tracking-[2px] text-[14px] font-extrabold text-start text-white hover:text-primary   hover:underline font-hel-bold mr-5    flex flex-row items-center gap-2 ">
                            How it works
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </Menu.Button>
                        </Link>
                        <Menu.Items
                          as="div"
                          className="absolute  bg-white flex flex-col w-72 p-3 rounded shadow-sm mt-5 z-50"
                        >
                          {/* <Menu.Item>
                        <Link
                          onClick={() => setIsOpen(false)}
                          to=""
                          className="     tracking-[2px] text-[14px] mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold"
                        >
                          How it works ?
                        </Link>
                      </Menu.Item> */}
                          <Menu.Item>
                            <Link
                              onClick={() => setIsOpen(false)}
                              to="/carbon-footprint-calculator"
                              className="    tracking-[2px] text-[14px]  mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold"
                            >
                              How our carbon footprint calculator works
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              onClick={() => setIsOpen(false)}
                              to="/carbon-offset-subscription-service"
                              className="    tracking-[2px] text-[14px] mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold"
                            >
                              How our carbon subscription works
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              onClick={() => setIsOpen(false)}
                              to="/track-your-carbon-impact"
                              className="    tracking-[2px] text-[14px] mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold"
                            >
                              How to track your carbon impact
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              onClick={() => setIsOpen(false)}
                              to="/carbon-offsets-partnership-with-cnaught"
                              className="    tracking-[2px] text-[14px] mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold"
                            >
                              How we source carbon offsets: Partnership with
                              CNaught
                            </Link>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </li>
                    <li
                      onClick={() => setIsOpen(false)}
                      className="text-start hover:bg-[#FBF4DB] p-2"
                    >
                      <Link
                        to="/about-our-mission"
                        className="   tracking-[2px] text-[14px] font-extrabold text-start text-white hover:text-primary   hover:underline font-hel-bold  "
                      >
                        Our mission
                      </Link>
                    </li>

                    <li
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-[#FBF4DB] p-2"
                    >
                      <Link
                        to="/contact"
                        className="   tracking-[2px] text-[14px] font-extrabold text-start text-white hover:text-primary   hover:underline font-hel-bold w-full "
                      >
                        Your Sync
                      </Link>
                    </li>
                    <li className="hover:bg-[#FBF4DB] p-2">
                      {isAuthenticated == "true" ? (
                        <Menu className="relative" as="div">
                          <Link
                            to="/personal-profile"
                            onClick={() => setIsOpen(true)}
                          >
                            <Menu.Button className="mr-5      text-center text-white hover:text-primary   hover:underline font-hel-bold flex flex-row items-center gap-1">
                              <span className="text-white hover:text-primary font-extrabold   hover:underline font-hel-bold  tracking-[2px] text-[14px]">
                                Dashboard
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </Menu.Button>
                          </Link>
                          <Menu.Items
                            as="div"
                            className="absolute  bg-white flex flex-col w-64 p-3 rounded shadow-sm mt-5"
                          >
                            <Menu.Item>
                              <Link
                                onClick={() => setIsOpen(false)}
                                to="/personal-profile"
                                className="    tracking-[2px] text-[11px] mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold "
                              >
                                View Dashboard
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link
                                onClick={handleLogout}
                                className="    tracking-[2px] text-[11px]  mx-5 my-2 text-white hover:text-primary   hover:underline font-hel-bold"
                              >
                                Logout
                              </Link>
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      ) : (
                        <Link
                          onClick={() => setIsOpen(false)}
                          to="/sign-in"
                          className="   tracking-[2px] text-[14px] font-extrabold text-white hover:text-primary   hover:underline font-hel-bold "
                        >
                          Sign in
                        </Link>
                      )}
                    </li>
                    <li className="w-full" onClick={() => setIsOpen(false)}>
                      <span onClick={handleStartShredding} className="w-[100%]">
                        <button className="flex md:hidden w-[100%] mt-4  text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:bg-white hover:text-primary text-lg justify-center items-center rounded-3xl mb-3">
                          Watch Now
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          {showConfirmation && (
            <div
              onClick={() => setShowConfirmation(false)}
              className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-primary p-6 rounded-md shadow-lg">
                <p className="text-lg font-semibold mb-4  text-white  tracking-wider">
                  Are you sure you want to log out?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="text-sm  text-[red] "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="text-sm  text-white  font-semibold tracking-wider"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {showLoginConfirmation && (
            <div
              onClick={() => setShowLoginConfirmation(false)}
              className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-primary px-10 py-6 rounded-md shadow-lg">
                <p className="text-lg font-semibold mb-4  text-white  tracking-wider ">
                  Please login to continue
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowLoginConfirmation(false)}
                    className="text-sm text-[red]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                      setShowLoginConfirmation(false);
                    }}
                    className="text-sm  text-white   font-semibold"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
