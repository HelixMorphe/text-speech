import React from "react";
import { MdHelp } from "react-icons/md";
const Help = () => {
  return (
    <div className="h-[100px] w-full bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-500">
      <div className="flex items-center justify-center gap-2">
        <MdHelp size={30} />
        <p className="font-bold">Help</p>
      </div>
    </div>
  );
};

export default Help;
