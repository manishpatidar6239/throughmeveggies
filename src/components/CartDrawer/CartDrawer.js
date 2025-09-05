import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 
import Image from "next/image";
export default function CartDrawer({ toggleDrawerCart }) {
  return (
    <Box sx={{ width: 330 }} role="presentation">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"start"}
        sx={{ px: 2.5, py: 3, backgroundColor: "#f9f9f9" }}
      >
        <Typography variant="body1" fontWeight={"bold"}>
          Cart
        </Typography>
        <CancelOutlinedIcon
          onClick={toggleDrawerCart(false)}
          sx={{ color: "#d3d3d3", cursor: "pointer" }}
        />
      </Stack>
      {/* empty cart */}

      {/* <Box
        textAlign={"center"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          px: 5,
        }}
      >
        <Avatar sx={{ bgcolor: "#f9f9f9", width: 75, height: 75 }}>
          <AddShoppingCartIcon
            sx={{ color: "#333", fontSize: 30, opacity: 0.5 }}
          />
        </Avatar>
        <Typography variant="body2" sx={{ my: 2.5, fontSize: 18 }}>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "50px",
            flex: 1,
            width: "100%",
            textTransform: "capitalize",
            fontSize: 16,
            fontWeight: "600",
            py: 1.2,
          }}
        >
          Browse Shop
        </Button>
      </Box> */}
      {/*End empty cart */}
      {/* cart */}
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        sx={{ height: "80vh", px: 3 }}
      >
        <Box>
          <Box>
            <Paper
              elevation={0}
              sx={{ display: "flex", py: 2, gap: 2, alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  boxShadow: 1,
                  padding: "2px",
                }}
              >
                <Image
                  src={"/images/Home/Hottest/h3-shop-category1.png"}
                  alt="Logo"
                  width={25}
                  height={25}
                  className="w-full h-full"
                />
              </Box>
              <Stack
                direction={"column"}
                sx={{ flex: 1 }}
                justifyItems={"center"}
              >
                <Typography variant="body1" fontWeight={"bold"} fontSize={14}>
                  Watermelon/Tarbuj
                </Typography>
                <Stack direction={"row"} spacing={0.4} alignItems={"center"}>
                  <Typography variant="body1" fontSize={14}>
                    2
                  </Typography>
                  <CloseIcon sx={{ fontSize: "14px" }} />
                  <Typography variant="body1" fontSize={14}>
                    ₹130
                  </Typography>
                </Stack>
              </Stack>
              <CloseIcon
                sx={{ color: "#d3d3d3", cursor: "pointer", width: "25px" }}
              />
            </Paper>
            <Divider />
          </Box>

          <Box>
            <Paper
              elevation={0}
              sx={{ display: "flex", py: 2, gap: 2, alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  boxShadow: 1,
                  padding: "2px",
                }}
              >
                <Image
                  src={"/images/Home/Hottest/h3-shop-category1.png"}
                  alt="Logo"
                  width={25}
                  height={25}
                  className="w-full h-full"
                />
              </Box>
              <Stack
                direction={"column"}
                sx={{ flex: 1 }}
                justifyItems={"center"}
              >
                <Typography variant="body1" fontWeight={"bold"} fontSize={14}>
                  Watermelon/Tarbuj
                </Typography>
                <Stack direction={"row"} spacing={0.4} alignItems={"center"}>
                  <Typography variant="body1" fontSize={14}>
                    2
                  </Typography>
                  <CloseIcon sx={{ fontSize: "14px" }} />
                  <Typography variant="body1" fontSize={14}>
                    ₹130
                  </Typography>
                </Stack>
              </Stack>
              <CloseIcon
                sx={{ color: "#d3d3d3", cursor: "pointer", width: "25px" }}
              />
            </Paper>
            <Divider />
          </Box>
        </Box>
        <Box
          textAlign={"center"}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #eee",
            pt: 1,
            mt: 5,
            gap: 1.5,
          }}
        >
          <Typography
            variant="body1"
            sx={{ textAlign: "left", fontWeight: "600" }}
          >
            Subtotal: <Box component="span">$260.00</Box>
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "50px",
              flex: 1,
              width: "100%",
              textTransform: "capitalize",
              fontSize: 16,
              fontWeight: "600",
              py: 1.2,
            }}
          >
            View Cart
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "50px",
              flex: 1,
              width: "100%",
              textTransform: "capitalize",
              fontSize: 16,
              fontWeight: "600",
              py: 1.2,
            }}
          >
            Checkout
          </Button>
        </Box>
      </Stack>
      {/* cart */}
    </Box>
  );
}
