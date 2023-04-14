import React from "react";
import { BiPhotoAlbum } from "react-icons/bi";
const Gallery = () => {
  return (
    <div className="h-[200px] w-full shadow-lg rounded-lg bg-white flex justify-center items-center">
      <div className="flex items-center justify-center flex-col gap-1 text-gray-500">
        <BiPhotoAlbum size={30} className="" />
        <p className="font-bold">Gallery</p>
      </div>
    </div>
  );
};

export default Gallery;
