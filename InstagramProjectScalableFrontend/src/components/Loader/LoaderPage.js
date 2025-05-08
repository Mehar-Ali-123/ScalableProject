import React from "react";
import Loader from "./Loader";
const LoaderPage = () => {
  return (
    <div className="loaderContainer fixed inset-0 bg-white    flex items-center justify-center"> 
        <Loader width="w-10" height="h-10" /> 
    </div>
  );
};

export default LoaderPage;
