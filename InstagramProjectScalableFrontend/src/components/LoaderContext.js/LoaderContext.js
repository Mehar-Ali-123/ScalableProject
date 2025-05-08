import React, { createContext, useState } from "react";

// Create a new context
const LoaderContext = createContext(); 
 

// Create a LoaderProvider component to wrap your entire application
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoading" , isLoading)

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}> 
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
