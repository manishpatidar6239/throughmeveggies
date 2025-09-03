 
import React from "react";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import Image from "next/image";

export default function ProductCard({ product }) {
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
        textAlign: "center",
        borderRadius: 2,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Image
        src={"/images/home/CardBgSvg.svg"}
        width={100}
        height={100}
        alt="card"
        className="absolute top-[-36%] right-0 left-0 mx-auto w-fit z-[-1] opacity-5 scale-[1.15]"
      />
      <CardMedia component="img" height="160" image={imageUrl} alt={name} />
      <CardActions sx={{ justifyContent: "center", gap: 1 }}>
        {actions.map((action) => (
          <IconButton
           key={action.name}
            component={Link}
            href={action.url}
            aria-label={action.name}
            sx={{
              bgcolor: "bglightorange10",
              width: "38px",
              height: "38px",
             
              "&:hover": {
                bgcolor: "primary.main", // primary background on hover
                color: "white",
              },
            }}
          >
           {React.cloneElement(action.icons, { sx: { fontSize: 18 } })}
          </IconButton>
        ))}
      </CardActions>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        {priceRange ? (
          <Typography color="primary" fontWeight="bold" my={1.5}>
            ₹{priceRange.min} – ₹{priceRange.max} {unit}
          </Typography>
        ) : (
          <Typography color="primary" fontWeight="bold" my={1.5}>
            {originalPrice && (
              <span style={{ textDecoration: "line-through" }}>
                ₹{originalPrice}
              </span>
            )}
            <span style={{ marginLeft: 8 }}>₹{currentPrice}</span>
          </Typography>
        )}
        {rating && <Rating value={rating} readOnly sx={{ fontSize: 18 }} />}
      </CardContent>
    </Card>
  );
}
