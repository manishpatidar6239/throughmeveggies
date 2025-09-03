
import { topMenuLinks } from "@/data/data";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; 
import Link from "next/link";

export const TopBar = () => {
  return (
    <>
      <Box sx={{ py: 1, borderBottom: '1px solid #e7e7e7' }}>
        <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
          <Stack
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            direction="row"
          >
            <Typography variant="body2"   className="text-sm font-medium">
              Welcome to our Fresh Vegetables & Fruits store Throughmeveggies!
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              {topMenuLinks.map((links) => (
                <Link
                  key={links.id}
                  href={links.url} 
                >
                  {links.name === "My Wishlist" && (
                    <FavoriteBorderIcon
                      sx={{ mr: 0.5 }}
                      aria-label="Wishlist Icon"
                    />
                  )}
                  {links.name}
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
