import React, { useState } from "react";
import Logo from "../assets/images/footer-logo-2.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import react-hook-form
import axios from "axios"; // Import Axios for API calls
import { server } from "../server";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";

function ForgetPass() {
  const [otpField, setOtpField] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const email = watch("email");

  const handleSendOtp = async (data) => {
    setLoader(true);
    try {
      const response = await axios.post(`${server}/forgot-password`, {
        email,
      });
      console.log(response.data);
      setOtpField(true);
      setLoader(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoader(false);
    }
  };

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const response = await axios.post(`${server}/reset-password`, {
        email,
        otp: data.otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      console.log(response.data);
      reset();
      toast.success("Successfully Changed password", {
        autoClose: 1000,
        style: {
          marginTop: "100px",
        },
      });
      setLoader(false);
    } catch (error) {
      console.error("Error setting new password:", error);
      toast.error("Error setting new password", {
        autoClose: 3000,
        style: {
          marginTop: "100px",
        },
      });
      setLoader(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-28">
        <h1 className="w-full md:text-[2rem] leading-[40px] text-center uppercase    ">
          <span className="text-primary">Set Password </span>
          to unlock Instagram.
        </h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!otpField ? (
            <form className="space-y-6" onSubmit={handleSubmit(handleSendOtp)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: /^\S+@\S+$/i,
                    })}
                    className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:leading-6 outline-none px-2 ${errors.email ? "border-red-500" : ""
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-md">
                <button
                  type="submit"
                  className="font-semibold text-sm border-2 border-primary p-2 text-primary rounded-md mt-2 w-full"
                >
                  {loader ? <Loader /> : "Send OTP"}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-sm">
                Please check your email{" "}
                <span className="text-[blue]">{email}</span> for the OTP to
                reset your password
              </p>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter OTP here"
                  {...register("otp", { required: "OTP is required" })}
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:leading-6 outline-none px-2 ${errors.otp ? "border-red-500" : ""
                    }`}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register("newPassword", {
                      required: "New Password is required",
                    })}
                    className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:leading-6 outline-none px-2  ${errors.newPassword ? "border-red-500" : ""
                      }`}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value == watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:leading-6 outline-none px-2  ${errors.confirmPassword ? "border-red-500" : ""
                      }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-text-primary px-3 py-2 text-md font-semibold leading-6 bg-primary text-white shadow-sm text-sm"
                >
                  {loader ? <Loader /> : "Set Password"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-10 text-center text-md text-gray-500">
            Not a member?
            <Link
              to="/sign-up"
              className="text-sm font-semibold leading-6 text-primary hover:text-primary px-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ForgetPass;
