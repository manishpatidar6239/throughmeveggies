import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react"; 
import AddIcon from "@mui/icons-material/Add";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AdsClickIcon from "@mui/icons-material/AdsClick";
export const SatisfiedClients = () => {
  const stats = [
    {
      id: 1,
      icon: <SensorOccupiedIcon color="primary" fontSize="inherit" />,
      value: "1,542",
      label: "Satisfied Clients",
    },
    {
      id: 2,
      icon: <AddToDriveIcon color="primary" fontSize="inherit" />,
      value: "182",
      label: "Expert Team",
    },
    {
      id: 3,
      icon: <AddTaskIcon color="primary" fontSize="inherit" />,
      value: "285",
      label: "Activate Products",
    },
    {
      id: 4,
      icon: <AdsClickIcon color="primary" fontSize="inherit" />,
      value: "27",
      label: "Awards Winning",
    },
  ];

  return (
    <Box bgcolor={"black"} py={5}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="space-between"
          width={"100%"}
        >
          {stats.map(({ id, icon, value, label }) => (
            <Grid key={id} item xs={6} md={3}>
              <Stack
                direction="row"
                spacing={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box fontSize={60}>{icon}</Box>
                <Stack direction="column" spacing={1} position={"relative"}>
                  <Stack direction="row" spacing={0} position={"relative"}>
                    <Typography variant="h4" color="white" fontWeight={"600"}>
                      {value}
                    </Typography>
                    <Box color="#ff7800" fontWeight={"900"}>
                      <AddIcon color="#ff7800" fontWeight="bold" />
                    </Box>
                  </Stack>
                  <Typography
                    color="white"
                    variant="body1"
                    style={{ margin: 0 }}
                  >
                    {label}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
