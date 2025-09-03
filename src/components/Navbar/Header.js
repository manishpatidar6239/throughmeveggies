"use client";
import React from "react";
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Link from "next/link";

export const Header = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{ my: 1 }}>
      <Container maxWidth="lg">
        <Stack
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          direction="row"
        >
          <Image
            src="/images/throughmeveggiess.png"
            alt="Logo"
            width={170}
            height={100}
            priority
          />
          <Paper
            component="form"
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "60%",
              borderRadius: 50,
              overflow: "hidden",
              border: "2px solid #e7e7e7",
              height: "65px",
            }}
          >
             <FormControl
                variant="standard"
                elevation={0}
                sx={{
                  minWidth: 120,
                  border: "none",
                  padding: 0,
                  backgroundColor: "#f5f5f5",
                  height: "100%",
                  borderRadius: "100px 0px 0px 100px",
                }}
              >
                <Select
                  elevation={0}
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  variant="outlined"
                  sx={{
                    boxShadow: "none",
                    padding: 0,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em sx={{ color: "#eee" }}>Select a Category</em>
                  </MenuItem>
                  <MenuItem value={10}>Bread & Bakery</MenuItem>
                  <MenuItem value={20}>Coffee</MenuItem>
                  <MenuItem value={30}>Discount Weekly</MenuItem>
                  <MenuItem value={40}>Bread & Bakery</MenuItem>
                  <MenuItem value={50}>Coffee</MenuItem>
                  <MenuItem value={60}>Discount Weekly</MenuItem>
                </Select>
              </FormControl>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Product"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="button"
              sx={{
                p: "14px 55px",
                height: "100%",
                backgroundColor: "primary.main",
                borderRadius: "0 100px 100px 0px",
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
              }}
              aria-label="search"
            >
              Search
            </IconButton>
          </Paper>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <HeadsetMicIcon sx={{ fontSize: "50px" }} />
            <Stack direction="column" spacing={0}>
              <Typography>Call Us</Typography>
              <Link href={"/"}>+91 000 000 0000</Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
