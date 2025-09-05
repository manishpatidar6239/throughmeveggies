"use client";
import React, { useState } from "react";
import { menuLinks } from "@/data/data";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Sidebar } from "./Sidebar"; 
import CartDrawer from "../CartDrawer/CartDrawer";

export const Nav = () => {
  //  Sidebar Drawer

  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleDrawerSidebar = (newOpen) => () => {
    setOpenSidebar(newOpen);
  };

  //  Sidebar Drawer
  const [openCart, setOpenCart] = useState(false);
  const toggleDrawerCart = (open) => () => {
    setOpenCart(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 0 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Browse Categories  */}
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
              onClick={toggleDrawerSidebar(true)}
            >
              <MenuIcon />
              <Typography variant="body1" fontWeight={"600"}>
                Browse Categories
              </Typography>
            </Stack>
            <Drawer open={openSidebar} onClose={toggleDrawerSidebar(false)}>
              <Sidebar toggleDrawerSidebar={toggleDrawerSidebar} />
            </Drawer>
            {/*End Browse Categories  */}

            {/* Nav Links  */}

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

            {/* Card  */}
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.12)",
                height: "100%",
                minHeight: "65px",
                padding: "0 55px",
                cursor: "pointer",
              }}
              onClick={toggleDrawerCart(true)}
            >
              <ShoppingCartIcon />
              <Link
                href={"/"}
                className="font-bold text-sm"
                sx={{ flexGrow: 1 }}
              >
                Cart 0 - $0.00
              </Link>
            </Stack>
            <Drawer
              anchor="right"
              open={openCart}
              onClose={toggleDrawerCart(false)}
            >
              <CartDrawer toggleDrawerCart={toggleDrawerCart} />
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
