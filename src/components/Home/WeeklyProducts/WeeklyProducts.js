"use client";
import { Box, Container } from "@mui/material";
import React from "react";
import { Heading } from "../Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import { WeeklyProd } from "@/data/data";
import ProductCard from "../commoncard/ProductCard";

export const WeeklyProducts = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/home/h3-bg-section-02.png)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundColor: "bgSpringGreen",
        py: 12,
      }}
    >
      <Container maxWidth="lg">
        <Heading
          title="Discounts of the"
          highlight="Weekly Products"
          description={{
            body: "The demand for organic food is growing at a remarkable rate. Consumers have made it.",
          }}
        />
        <Box>
          <Swiper
            pagination={{
              clickable: true,
            }} 
            spaceBetween={20}
            slidesPerView={4}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Pagination]}
            style={{ padding: "40px 0" }}
          >
            {WeeklyProd.map((product) => (
              <SwiperSlide>
                <ProductCard key={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};
