import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Heading } from "../Heading";
import { Favorite } from "@mui/icons-material";

import Link from "next/link";
import ProductCard from "../commoncard/ProductCard";
import { TrendingProd } from "@/data/data";
export const TrendingProduct = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/home/h3-section-01.png)",
       backgroundPosition: 'bottom left', 
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
              {/* <Card sx={{ textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardActions sx={{ justifyContent: "space-between", px: 5 }}>
                  {product.actions.map((action) => (
                    <IconButton
                      component={Link}
                      href={action.url}
                      key={action.name}
                      aria-label={action.name}
                      sx={{
                        bgcolor: "bglightorange10",
                        width: "38px",
                        height: "38px",
                      }}
                    >
                      {action.icons}
                    </IconButton>
                  ))}
                </CardActions>
                <CardContent>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {product.name}
                  </Typography>
                  {product.priceRange ? (
                    <Typography color="primary" fontWeight={"bold"} my={1.5}>
                      ₹{product.priceRange.min} – ₹{product.priceRange.max}{" "}
                      {product.unit}
                    </Typography>
                  ) : (
                    <Typography color="primary" fontWeight={"bold"} my={1.5}>
                      {product.originalPrice && (
                        <span style={{ textDecoration: "line-through" }}>
                          ₹{product.originalPrice}
                        </span>
                      )}
                      <span
                        style={{
                          marginLeft: 8,
                          color: "primary",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{product.currentPrice}
                      </span>
                    </Typography>
                  )}
                  {product.rating && (
                    <Rating
                      value={product.rating}
                      readOnly
                      sx={{ fontSize: 18 }}
                    />
                  )}
                </CardContent>
              </Card> */}
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
