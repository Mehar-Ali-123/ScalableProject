import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mt-20 ">
      <main className="h-[75vh] w-full flex flex-col justify-center items-center bg-white">
        <h1 className="text-[160px] font-extrabold text-primary tracking-widest">
          404
        </h1>
        <div className="bg-[#FBB15F] px-2 text-sm rounded rotate-12 absolute tracking-wide">
          something went wrong
        </div>
        <button className="">
          <Link
            to="/"
            className="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FBB15F] group-hover:translate-y-0 group-hover:translate-x-0  rounded-3xl"></span>
            <span className="relative block px-8 py-3 bg-primary border border-[#FBB15F] border-current rounded-3xl">
              Go Home
            </span>
          </Link>
        </button>
        <span className="mt-5 tracking-wide">Please try again later </span>
      </main>
    </div>
  );
};

export default ErrorPage;
