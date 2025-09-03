"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { WeeklyProd } from "@/data/data";
import ProductCard from "../commoncard/ProductCard";
import { Box, Typography, IconButton, Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
export const LatestProduct = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box sx={{ position: "relative", padding: "1rem 0" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="gray70">
          New Latest Product
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            ref={prevRef}
            variant="outlined"
            sx={{ minWidth: "36px", px: "10px" }}
          >
            <WestIcon fontSize="small" />
          </Button>
          <Button
            ref={nextRef}
            variant="outlined"
            sx={{ minWidth: "36px", px: "10px" }}
          >
            <EastIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          loop
          onInit={(swiper) => {
            // Assign your refs here
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          style={{ padding: "0px 0 10px" }}
        >
          {WeeklyProd.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
