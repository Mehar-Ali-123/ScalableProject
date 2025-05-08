import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [showLoginConfirmation, setShowLoginConfirmation] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthentication");

  const handleStartShredding = () => {
    if (isAuthenticated === "true") {
      navigate("/watchandenjoy");
    } else {
      setShowLoginConfirmation(true);
    }
  };

  return (
    <>
      <section
        className="h-[590px] md:h-[650px]
      bg-[url('./assets/images/instaImg.jpg')]
     bg-no-repeat bg-cover  bg-black  mt-5"
      >
        <div className="w-full h-full flex  justify-center items-center backdrop-brightness-75">
          <div className="container mx-auto my-auto h-full flex px-5 py-24 items-center justify-center flex-col">
            <div className="text-center flex justify-center items-center lg:w-2/3 w-full flex-col my-auto">
              <h1 className="md:text-[50px] text-[#FFFFFF] text-2xl leading-[40px] md:leading-[70px] mb-2 pt-5 uppercase mt-20 lg:mt-5">
              🚀 <br/> Level up your feed<br />
                <span className=" text-white uppercase text-xl md:text-[50px]">
                Insta-style awaits !
                </span>
              </h1>
              <p className="text-white  leading-10 text-lg md:text-2xl mb-7 tracking-[1px]">
               Unlimited Access
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleStartShredding}
                  className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded-3xl text-md justify-center items-center w-[180px]"
                >
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {showLoginConfirmation && (
        <div
          onClick={() => setShowLoginConfirmation(false)}
          className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-primary px-10 py-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold mb-4  text-white  tracking-wider">
              Please login to continue
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLoginConfirmation(false)}
                className="text-sm   text-[red]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigate("/sign-in");
                  setShowLoginConfirmation(false);
                }}
                className="text-sm text-white  font-semibold tracking-wider"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
