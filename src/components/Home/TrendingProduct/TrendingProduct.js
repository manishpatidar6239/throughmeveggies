import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { Heading } from "../Heading";

import ProductCard from "../commoncard/ProductCard";
import { TrendingProd } from "@/data/data";
export const TrendingProduct = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/home/h3-section-01.png)",
        backgroundPosition: "bottom left",
        backgroundRepeat: "no-repeat",
        width: "100%",
        py: 12,
      }}
    >
      <Container maxWidth="lg">
        <Heading
          title="Our Trending"
          highlight="Organic & Fresh"
          description={{
            afterTitle: "Products",
            body: "We Connect buyers & Sellers of Natural, Organic, Enviornmetnlly sound products.",
          }}
        />
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {TrendingProd.map((product) => (
            <Grid key={product.id} size={{ xs: 6, md: 3, lg: 3 }}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "50px",
              textTransform: "capitalize",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
            }}
          >
            view All Product
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
