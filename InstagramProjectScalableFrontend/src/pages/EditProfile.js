import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { backend_url, server } from "../server";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";
import countryOptions from "../data";
import LoaderPage from "../components/Loader/LoaderPage";

function EditProfile() {
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [file, setFile] = useState(null);
  const newPassword = watch("newPassword");

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(`${server}/get-profile-data`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const user = response.data?.user;
        setUserData(user);

        // Set initial form values from fetched user data
        setValue("username", user.name);
        setValue("emailAddress", user.email);
        setValue("country", user.country);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [setValue]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a temporary URL for the selected file
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);
  };

  const onSubmit = async (formData) => {
    setLoader(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.username);
      formDataToSend.append("email", formData.emailAddress);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("currentPassword", formData.password);

      if (changePassword) {
        formDataToSend.append("newPassword", formData.newPassword);
      }

      if (file) {
        formDataToSend.append("file", file); // No need to append file name explicitly, FormData handles it
      }

      const response = await axios.put(
        `${server}/update-profile`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated successfully", {
        autoClose: 3000,
        style: {
          marginTop: "100px",
        },
      });

      if (changePassword) {
        setValue("password", "");
        setValue("newPassword", "");
        setValue("newPasswordConfirmation", "");
      }
      setChangePassword(false);

      console.log("Update profile response:", response.data);
      setLoader(false);
      // window.location.reload();
    } catch (error) {
      let errorMessage = "Error updating profile";

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      setLoader(false);
      toast.error(errorMessage, {
        autoClose: 3000,
        style: {
          marginTop: "100px",
        },
      });
      console.error("Error updating profile:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoaderPage />
      ) : (
        <div>
          {userData && (
            <div className="flex justify-center items-center my-10  ">
              <div className="col-span-4 sm:col-span-3 mt-44 w-[90%]  ">
                <h1 className="w-full text-center font-extrabold   text-3xl mt-5 flex justify-center gap-3">
                  <p className="text-primary">Edit</p>your Carbon Shredder
                  profile.
                </h1>
                <div className="rounded-lg md:p-6 px-0  mt-10 ">
                  <div className="flex flex-col items-center">
                    <img
                      src={fileUrl || `${backend_url}/${userData.avatar}`}
                      className="object-cover w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="carbon-footprint-offset"
                    />

                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <label
                        htmlFor="file"
                        className="text-white py-2 text-sm rounded-md w-44 text-center bg-primary px-4 cursor-pointer"
                      >
                        Update Image
                      </label>
                      <input
                        name="file"
                        id="file"
                        className="hidden"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <button
                        onClick={() => setChangePassword(!changePassword)}
                        className="text-white py-2 text-sm rounded-md w-44 text-center bg-primary px-4 cursor-pointer"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300 px-0 " />
                  <div className="flex flex-col   w-full mx-0   ">
                    <section className="max-w-4xl p-6 mx-auto w-full md:w-[80%]  ">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                          <div>
                            <label
                              className="text-md font-medium leading-6 text-gray-900 dark:text-gray-200"
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <input
                              id="username"
                              type="text"
                              {...register("username", { required: true })}
                              className={`block w-full py-2 mt-2 text-gray-700 shadow-md placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:text-sm sm:leading-6 outline-none px-2 rounded-md ${
                                errors.username ? "border-red-500" : ""
                              }`}
                            />
                            {errors.username && (
                              <p className="text-red-500 text-sm mt-1">
                                Username is required *
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="text-md font-medium leading-6 text-gray-900 dark:text-gray-200"
                              htmlFor="emailAddress"
                            >
                              Email Address
                            </label>
                            <input
                              id="emailAddress"
                              type="email"
                              {...register("emailAddress", { required: true })}
                              className={`block w-full py-2 mt-2 text-gray-700 shadow-md  placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:text-sm sm:leading-6 outline-none px-2 rounded-md ${
                                errors.emailAddress ? "border-red-500" : ""
                              }`}
                            />
                            {errors.emailAddress && (
                              <p className="text-red-500 text-sm mt-1">
                                Email Address is required *
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="text-md font-medium leading-6 text-gray-900 dark:text-gray-200"
                              htmlFor="password"
                            >
                              Old Password
                            </label>
                            <input
                              id="password"
                              type="password"
                              {...register("password", { required: true })}
                              className={`block w-full py-2 mt-2 text-gray-700 shadow-md  placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:text-sm sm:leading-6 outline-none px-2 rounded-md ${
                                errors.password ? "border-red-500" : ""
                              }`}
                            />
                            {errors.password && (
                              <p className="text-red-500 text-sm mt-1">
                                Old Password is required *
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="text-md font-medium leading-6 text-gray-900 dark:text-gray-200"
                              htmlFor="country"
                            >
                              Country
                            </label>
                            <select
                              id="country"
                              {...register("country", { required: true })}
                              className={`block w-full px-2 py-3 mt-2 text-gray-700 shadow-md  placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:text-sm sm:leading-6 outline-none rounded-md ${
                                errors.country ? "border-red-500" : ""
                              }`}
                            >
                              <option value="">Select a country</option>
                              {countryOptions.map((country, index) => (
                                <option key={index} value={country.label}>
                                  {country.label}
                                </option>
                              ))}
                            </select>
                            {errors.country && (
                              <p className="text-red-500 text-sm mt-1">
                                Country is required *
                              </p>
                            )}
                          </div>

                          {changePassword && (
                            <div>
                              <label
                                className="text-md font-medium leading-6 text-gray-900 dark:text-gray-200"
                                htmlFor="newPassword"
                              >
                                New Password
                              </label>
                              <input
                                id="newPassword"
                                type="password"
                                {...register("newPassword", { required: true })}
                                className={`block w-full py-2 mt-2 text-gray-700 shadow-md  placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:text-sm sm:leading-6 outline-none px-2 rounded-md ${
                                  errors.newPassword ? "border-red-500" : ""
                                }`}
                              />
                              {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                  New Password is required *
                                </p>
                              )}
                              <br />
                              <label
                                className="text-md font-medium leading-6 text-gray-900 dark:text-gray-200 "
                                htmlFor="newPasswordConfirmation"
                              >
                                Confirm New Password
                              </label>
                              <input
                                id="newPasswordConfirmation"
                                type="password"
                                {...register("newPasswordConfirmation", {
                                  required: true,
                                  validate: (value) =>
                                    value == newPassword ||
                                    "Passwords do not match",
                                })}
                                className={`block w-full py-2 mt-2 text-gray-700 shadow-md  placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:text-sm sm:leading-6 outline-none px-2 rounded-md ${
                                  errors.newPasswordConfirmation
                                    ? "border-red-500"
                                    : ""
                                }`}
                              />
                              {errors.newPasswordConfirmation && (
                                <p className="text-red-500 text-sm mt-1">
                                  Passwords do not match
                                </p>
                              )}
                            </div>
                          )}
                          <br />
                        </div>
                        <div className="mt-6">
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-text-primary px-3 py-1.5 text-sm font-semibold leading-6 bg-primary text-white shadow-md"
                          >
                            {loader ? <Loader /> : "  Update Profile"}
                          </button>
                        </div>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default EditProfile;
