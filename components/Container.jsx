import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex w-full min-h-[100vh]">
      <div className="max-w-[65rem]  w-[90%] flex flex-col mx-auto mt-5">
        {children}
      </div>
    </div>
  );
};

export default Container;
