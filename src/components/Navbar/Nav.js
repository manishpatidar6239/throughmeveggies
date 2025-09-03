import { menuLinks } from "@/data/data";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 0 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.12)",
                height: "100%",
                minHeight: "65px",
                padding: "0 55px",
              }}
            >
              <MenuIcon />
              <Typography variant="h6">Browse Categories</Typography>
            </Stack>
            <Stack direction={"row"} spacing={4} sx={{ flexGrow: 1 }}>
              {menuLinks.map((link, index) => {
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="font-bold text-sm"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.12)",
                height: "100%",
                minHeight: "65px",
                padding: "0 55px",
              }}
            >
              <ShoppingCartIcon />
              <Link
                href={"/"}
                className="font-bold text-sm"
                sx={{ flexGrow: 1 }}
              >
                Card 0 - $0.00
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
