import React from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";

export const OfferHome = () => {
  const offers = [
    {
      id: 1,
      title: "Get 10% off on Fruits Item",
      description:
        "Shop our selection of organic fresh vegetables in a discounted price. 10% off.",
      promo: "10% off",
      buttonText: "Shop Now",
      image: "/images/Home/offer/h3-shop-banner1.png",
    },
    {
      id: 2,
      title: "Get 15% Organic Vegetable",
      description:
        "Shop our selection of organic fresh vegetables in a discounted price. 10% off.",
      promo: "15%",
      buttonText: "Shop Now",
      image: "/images/Home/offer/h3-shop-banner2.png",
    },
    {
      id: 3,
      title: "Get 10% off on Special Item",
      description:
        "Shop our selection of organic fresh vegetables in a discounted price. 10% off.",
      promo: "10% off",
      buttonText: "Shop Now",
      image: "/images/Home/offer/h3-shop-banner3.png",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "bglightorange", py: 12 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: { xs: "100%", lg: "46.838%" },
          }}
        >
          <Typography variant="h4" fontWeight={"bold"} color="gray70">
            What We{" "}
            <Box component="span" sx={{ color: "#3cb815" }}>
              Offer
            </Box>{" "}
            For You
          </Typography>
          <Typography variant="body1" color="gray40">
            We Connect buyers and Sellers of Naturals Organic Environmentally
            sound products. We find the best and makers natural and organic.
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {offers.map((offers, index) => {
            return (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Paper
                  sx={{
                    px: 3,
                    py: 4,
                    borderRadius: 2,
                    position: "relative",
                    transition:
                      "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 3,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {offers.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ my: 3, maxWidth: { xs: "100%", lg: "70%" } }}
                  >
                    {offers.description}
                  </Typography>
                  <Button variant="outlined" sx={{ borderRadius: "50px" }}>
                    {offers.buttonText}
                  </Button>
                  <Image
                    src={offers.image}
                    width={150}
                    height={150}
                    alt={offers.image}
                    className="absolute right-2 bottom-2"
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
