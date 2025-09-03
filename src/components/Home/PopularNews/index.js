"use client";
import React from "react";
import { Box, Container, Paper } from "@mui/material";
import { NewsVideo } from "./NewsVideo";
import { LatestProduct } from "./LatestProduct";
import { Heading } from "../Heading";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { BestSellers } from "./BestSellers";

export const PopularNews = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  return (
    <Box py={12} bgcolor={'bggray200'}>
      <Container maxWidth="lg">
        <Heading
          title="Most Popular & New"
          highlight="Organic Food"
          description={{
            body: "The demand for organic food is growing at a remarkable rate. Consumers have made it want organic produce and every sector of the food.",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={5}>
              <NewsVideo />
            </Grid>
            <Grid size={7}>
              <BestSellers />
               <LatestProduct />
            </Grid>
            
          </Grid>
        </Box>
        
      </Container>
    </Box>
  );
};
