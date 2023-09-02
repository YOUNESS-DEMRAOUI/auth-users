import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="w-12 h-12 border-[5px] border-black border-b-transparent rounded-[50%] inline-block animate-spin"></span>
    </div>
  );
};

export default Loader;
