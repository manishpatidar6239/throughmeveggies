import React from "react";
import Link from "next/link";
import {
  Card,
  CardMedia,
  IconButton,
  CardContent,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import Image from "next/image";

export default function ProductCardLeft({ product }) {
  const {
    name,
    imageUrl,
    actions = [],
    priceRange,
    unit,
    originalPrice,
    currentPrice,
    rating,
  } = product;

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 2,
        position: "relative",
        zIndex: 1,
        px: 0,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box>
          <Image
            src={"/images/home/CardBgSvg.svg"}
            width={100}
            height={100}
            alt="card"
            className="absolute top-2/4 transition-transform duration-300 rotate-180   left-[-14px]   bottom-0 mx-auto w-fit z-[-1] opacity-5 scale-[1.15]"
          />
          <CardMedia
            component="img"
            height="100"
            width="150"
            image={imageUrl}
            alt={name}
          />
        </Box>
        <Box sx={{ flex: "1 0 auto" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
            {priceRange ? (
              <Typography color="primary" fontWeight="bold">
                ₹{priceRange.min} – ₹{priceRange.max} {unit}
              </Typography>
            ) : (
              <Typography color="primary" fontWeight="bold">
                {originalPrice && (
                  <span style={{ textDecoration: "line-through" }}>
                    ₹{originalPrice}
                  </span>
                )}
                <span style={{ marginLeft: 8 }}>₹{currentPrice}</span>
              </Typography>
            )}
            {rating && <Rating value={rating} readOnly sx={{ fontSize: 18 }} />}
            <Box display={"flex"} gap={1} mt={1}>
              {actions.map((action) => (
                <IconButton
                  key={action.name}
                  component={Link}
                  href={action.url}
                  aria-label={action.name}
                  sx={{
                    bgcolor: "bglightorange10",
                    width: "30px",
                    height: "30px",

                    "&:hover": {
                      bgcolor: "primary.main", // primary background on hover
                      color: "white",
                    },
                  }}
                >
                  {React.cloneElement(action.icons, { sx: { fontSize: 18 } })}
                </IconButton>
              ))}
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}
