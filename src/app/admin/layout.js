"use client";
import { Box } from "@mui/material";

export default function AdminRootLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
        {children}
      </Box>
  );
}
