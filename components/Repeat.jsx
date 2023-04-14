import React from "react";
import { ImLoop } from "react-icons/im";
const Repeat = () => {
  return (
    <div className="h-[200px] w-full shadow-lg rounded-lg bg-white flex justify-center items-center">
      <div className="flex items-center justify-center flex-col gap-1 text-gray-500">
        <ImLoop size={30} className="" />
        <p className="font-bold">Repeat</p>
      </div>
    </div>
  );
};

export default Repeat;
