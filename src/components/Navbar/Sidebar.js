import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Image from "next/image";
import Link from "next/link";
import { HottestData } from "@/data/data";

export const Sidebar = ({ toggleDrawerSidebar }) => {
  return (
    <Box sx={{ width: 300, px: 2.5, py: 3 }} role="presentation">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"start"}
        sx={{ mb: 3 }}
      >
        <Image
          src="/images/throughmeveggiess.png"
          alt="Logo"
          width={110}
          height={100}
          priority
        />
        <CancelOutlinedIcon
          onClick={toggleDrawerSidebar(false)}
          sx={{ color: "#d3d3d3", cursor: "pointer" }}
        />
      </Stack>
      {HottestData.map((item, index) => (
        <Stack
          key={index}
          direction={"row"}
          spacing={1.5}
          justifyContent={"start"}
          alignItems={"center"}
          sx={{
            py: 1,
            borderBottom: "1.5px solid #eee",
            borderRadius: "7px",
            pl: 1,
            "&:hover": {
              color: "white",
              //   backgroundColor: "#ed1d26",
              backgroundColor: "primary.main",
            },
          }}
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
              padding: "2px",
              "&:hover": {
                color: "white",
                //   backgroundColor: "#ed1d26",
                backgroundColor: "red",
              },
            }}
          >
            <Image
              src={item.imageUrl}
              alt="Logo"
              width={25}
              height={25}
              className="w-full h-full"
            />
          </Box>
          <Link href={"/"} className="text-[.9rem] font-semibold">
            {item.name}
          </Link>
        </Stack>
      ))}

      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              className="group "
              sx={{
                py: 1.2,
                borderBottom: "1.5px solid #eee",
                borderRadius: "7px",
                "&:hover": {
                  color: "white",
                  //   backgroundColor: "#ed1d26",
                  backgroundColor: "primary.main",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                {index % 2 === 0 ? (
                  <InboxIcon className="group:hover:text-white" />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ fontSize: "16px", fontWeight: "600" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
};
