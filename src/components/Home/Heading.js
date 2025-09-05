import { Box, Typography } from "@mui/material";
import React from "react";

export const Heading = ({ title, highlight, description, maxWidth="60%" }) => {
  return (
    <Box
      textAlign={"center"}
      sx={{ maxWidth: { xs: "100%", sm: `${maxWidth}` }, mx: "auto" }}
    >
      <Typography variant="h4" fontWeight="bold" color="gray70" mb={3} className="font-lora">
        {title}{" "}
        <Box component="span" sx={{ color: "#3cb815" }}>
          {highlight}
        </Box>{" "}
        {description?.afterTitle}
      </Typography>
      {description?.body && (
        <Typography variant="body1" color="gray40">
          {description.body}
        </Typography>
      )}
    </Box>
  );
};
