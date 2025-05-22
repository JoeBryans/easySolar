import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className}flex w-full`}>
      <div className="max-w-[65rem]  w-[90%] flex flex-col mx-auto mt-5">
        {children}
      </div>
    </div>
  );
};

export default Container;
