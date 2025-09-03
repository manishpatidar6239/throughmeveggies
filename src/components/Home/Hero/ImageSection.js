import Image from "next/image";
import React from "react";

export const ImageSection = ({ImageSrc}) => {
    console.log('images logo', ImageSrc)
  return (
    <Image
      src={ImageSrc}
      width={100}
      height={100}
      alt={ImageSrc}
      className="w-full scale-100"
    />
  );
};
