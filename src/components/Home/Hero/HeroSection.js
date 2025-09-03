"use client";
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";

import TextSection from "./TextSection";
import { ImageSection } from "./ImageSection";

export const HeroSection = () => {
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
