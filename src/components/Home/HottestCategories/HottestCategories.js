import React from "react";
import { Heading } from "../Heading";
import EastIcon from "@mui/icons-material/East";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { HottestData } from "@/data/data";

export const HottestCategories = () => {
  return (
    <Box sx={{ backgroundColor: "bglightorange", pb: 12 }}>
      <Container maxWidth="lg">
        <Heading
          title="Browse Our"
          highlight="Hottest"
          description={{
            afterTitle: "Categories",
          }}
        />

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {HottestData.map((Categories, index) => {
            return (
              <Grid key={index} size={{ xs: 6, md: 3, lg: 2 }}>
                <Paper
                  className="group "
                  sx={{
                    px: 2,
                    pt: 1,
                    pb: 3,
                    borderRadius: 2,
                    position: "relative",
                    textAlign: "center",
                    transition:
                      "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 3,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{ px: 1.5 }}
                    className="mb-[22px] h-32 overflow-hidden flex items-center justify-center"
                  >
                    <Link href={"/"}>
                      <Image
                        src={Categories.imageUrl}
                        width={139}
                        height={150}
                        alt={Categories.imageUrl}
                      />
                    </Link>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {Categories.name}
                  </Typography>
                  <Box
                    className="hidden group-hover:flex  transition-transform duration-300 delay-100 ease-in-out 
              opacity-0 group-hover:opacity-100 
              translate-y-2 group-hover:translate-y-0
              absolute bottom-[-20px] right-0 left-0 mx-auto 
              bg-green-500 rounded-full w-8 h-8 justify-center items-center"
                  >
                    <Link href={"/"}>
                      <EastIcon
                        sx={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                      />
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        {/* <h1>
          Shop our selection of organic fresh vegetables in a discounted price.
          10% off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10%
          off.Shop our selection of organic fresh vegetables in a discounted
          price. 10% off.Shop our selection of organic fresh vegetables in a
          discounted price. 10% off.Shop our selection of organic fresh
          vegetables in a discounted price. 10% off.Shop our selection of
          organic fresh vegetables in a discounted price. 10% off.Shop our
          selection of organic fresh vegetables in a discounted price. 10% off.
        </h1> */}
      </Container>
    </Box>
  );
};
