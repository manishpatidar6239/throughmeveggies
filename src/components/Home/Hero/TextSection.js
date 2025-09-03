import { Box, Button, Typography } from "@mui/material";
import React from "react";

const TextSection = ({ title, heading, subtitle }) => {
  return (
    <Box sx={{}}>
      <Typography
        variant="body1"
        color="primary.main"
        gutterBottom
        sx={{ textTransform: "uppercase", fontSize: 20, fontWeight: "500" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: 70, fontWeight: "bold" }}
      >
        {heading}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 18, fontWeight: "600", my: 4 }}
      >
        {subtitle}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          href="#text-buttons"
          sx={{
            borderRadius: "50px",
            textTransform: "capitalize",
            px: 4,
            py: 1.2,
          }}
        >
          Shop Now
        </Button>
        <Button
          variant="outlined"
          href="#text-buttons"
          sx={{
            borderRadius: "50px",
            textTransform: "capitalize",
            px: 4,
            py: 1.2,
          }}
        >
          About Us
        </Button>
      </Box>
    </Box>
  );
};

export default TextSection;
