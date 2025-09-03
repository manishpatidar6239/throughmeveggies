"use client";
import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Mousewheel, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
import styled from "@emotion/styled";
import TextSection from "./TextSection";
import { ImageSection } from "./ImageSection";
const HeroSlide = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "80vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  textAlign: "center",
}));

export const HeroSection = () => {
  const slides = [
    {
      title: "We Deliver Best Organic Food",
      subtitle: "Certified‑organic mix of fruit and veggies...",
      imageUrl: "/images/organic1.jpg",
      actionLabel: "Shop Now",
    },
    {
      title: "Fresh & Healthy",
      subtitle: "Perfect for weekly cooking & snacking!",
      imageUrl: "/images/organic2.jpg",
      actionLabel: "Discover More",
    },
    // more slides...
  ];
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/home/h3-section-01.png)",
        backgroundPosition: "bottom left",
        backgroundRepeat: "no-repeat",
        width: "100%",
        py: 0,
      }}
    >
      <Container maxWidth="lg">
        <Swiper
          autoplay={true}
          loop={true}
          modules={[Autoplay, Mousewheel, EffectFade]}
        >
          <SwiperSlide>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100vh"}
            >
              <TextSection
                title="We are ThroughMeVeggies"
                heading="We are the Best service provider"
                subtitle="Certified-organic Mix of fruit and Veggies, Perfect for weekly cooking  & Snacking!"
              />
              <ImageSection ImageSrc="/images/Home/Hero/h3-layer3.png" />
            </Stack>
          </SwiperSlide>
          <SwiperSlide>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100vh"}
            >
              <ImageSection ImageSrc="/images/Home/Hero/h3-slider-banner1.png" />
              <TextSection
                title="We are ThroughMeVeggies"
                heading="We are the Best service provider"
                subtitle="Certified-organic Mix of fruit and Veggies, Perfect for weekly cooking  & Snacking!"
              />
            </Stack>
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
};
