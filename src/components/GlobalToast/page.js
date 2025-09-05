"use client";
import { useMediaQuery } from "@mui/material";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 3000,
  limit: 1,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: "colored",
  transition: Bounce,
};

export default function GlobalToastContainer() {
  const isMobile = useMediaQuery("(max-width:500px)");
  
  return (
    <ToastContainer
      {...TOAST_CONFIG}
      style={{
        width: isMobile ? "90%" : "auto",
        left: isMobile ? "5%" : "50%",
        top: "10px",
        transform: isMobile ? "none" : "translateX(-50%)",
        zIndex: 99999,
      }}
    />
  );
}
