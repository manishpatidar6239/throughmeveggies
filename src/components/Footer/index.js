import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import Image from "next/image";
import { footerSections } from "@/data/data";
import Link from "next/link";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="https://mui.com/">
        Sitemark
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/home/bg-footer2.jpg)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundColor: "bgSpringGreen",
      }}
    >
      <Divider />
      <Container
        sx={{
          pt: { xs: 8, sm: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Box sx={{ maxWidth: "25%" }}>
            <Image
              src="/images/throughmeveggiess.png"
              alt="Logo"
              width={170}
              height={100}
              priority
            />

            <Typography variant="body2" sx={{ color: "text.secondary", my: 2 }}>
              The variety of products available at our store at the moment is
              vast, but we still continue to widen our assortment.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: { sm: "flex" } }}>
            {footerSections.map((Item) => (
              <Box
                key={Item.title}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  flexDirection: "column",
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {Item.title}
                </Typography>
                <Box
                  sx={{
                    height: 3,
                    borderRadius: "50px",
                    backgroundColor: "primary.main",
                    width: "25px",
                    mb: 2,
                  }}
                />
                {Item.links &&
                  Item.links.map(({ label, url }, idx) => (
                    <Link
                      key={idx}
                      href={url}
                      className="transition-[0.3s cubic-bezier(0.24, 0.74, 0.58, 1)]  touch-manipulation text-sm text-[#0009] hover:text-black hover:font-bold"
                    >
                      {label}
                    </Link>
                  ))}
                {Item.address && (
                  <Typography color="text.secondary" variant="body2">
                    {Item.address.join(", ")}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: { xs: 4, sm: 4 },
            mt: 5,
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body1" fontWeight="400" color="grey.700">
            © 2025{" "}
            <Box component="span" sx={{ color: "#3cb815" }}>
              Throughmeveggies.com.
            </Box>{" "}
            All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
