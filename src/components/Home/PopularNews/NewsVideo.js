import { CardMedia } from "@mui/material";
import Image from "next/image";
import React from "react";

export const NewsVideo = () => {
  return (
    <>
      <Image
        src={"/images/Home/VideoBanner.png"}
        width={200}
        height={100}
        alt="video"
        className="w-full h-full"
      />
      
    </>
  );
};
