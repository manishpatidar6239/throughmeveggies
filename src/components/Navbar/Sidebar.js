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

export const Sidebar = ({ toggleDrawer }) => {
  return (
    <Box
      sx={{ width: 250, px: 2, py: 3 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
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
          onClick={toggleDrawer(false)}
          sx={{ color: "#d3d3d3" }}
        />
      </Stack>
      <List>
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
              <ListItemIcon sx={{minWidth: '40px'}}>
                {index % 2 === 0 ? (
                  <InboxIcon
                  className="group:hover:text-white"
                   
                  />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{fontSize: '16px', fontWeight: '600'}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
