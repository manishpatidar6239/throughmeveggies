'use client'
import { menuLinks } from "@/data/data";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { Sidebar } from "./Sidebar";

export const Nav = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 0 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Stack
              direction={"row"}
              spacing={1.5}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.12)",
                height: "100%",
                minHeight: "65px",
                padding: "0 30px",
                cursor: "pointer",
                mr: 7,
              }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
              <Typography variant="body1" fontWeight={"600"}>
                Browse Categories
              </Typography>
            </Stack>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Sidebar toggleDrawer={toggleDrawer}/>
            </Drawer>
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
