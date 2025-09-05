"use client";

import React, { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { toast } from "react-toastify";
import { setUser } from "@/redux/reducers";
import { setAdmin } from "@/redux/reducers";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/apiHandler/page";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/theme";
import GlobalToastContainer from "@/components/GlobalToast/page";

export default function ClientProviders({ children }) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalToastContainer />
          <InnerClientProviders>{children}</InnerClientProviders>
        </ThemeProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
}

function InnerClientProviders({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useRef(false);

  const checkToken = async () => {
    const isAdminRoute = 
      typeof window !== "undefined" && 
      window.location.pathname.startsWith("/admin");
      
    const tokenName = isAdminRoute ? "AdminToken" : "UserToken";
    const token = Cookies.get(tokenName);

    if (!token) {
      if (isAdminRoute) {
        dispatch(setAdmin(null));
        if (window.location.pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
      //  else {
      //   dispatch(setUser(null));
      //   if (!["/signin", "/signup"].includes(window.location.pathname)) {
      //     router.push("/signin");
      //   }
      // }
      return;
    }

    try {
      const response = await api.get(`/auth/me`);
      
      if (response.success) {
        if (isAdminRoute) {
          dispatch(setAdmin(response.data));
          if (window.location.pathname === "/admin/login") {
            router.push("/admin/dashboard");
          }
        } else {
          dispatch(setUser(response.data));
          if (["/signin", "/signup"].includes(window.location.pathname)) {
            router.push("/");
          }
        }
      } else {
        handleInvalidToken(isAdminRoute, tokenName);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      handleInvalidToken(isAdminRoute, tokenName);
    }
  };

  const handleInvalidToken = (isAdminRoute, tokenName) => {
    Cookies.remove(tokenName, { path: "/" });
    if (isAdminRoute) {
      dispatch(setAdmin(null));
      if (window.location.pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    } else {
      dispatch(setUser(null));
      if (!["/signin", "/signup"].includes(window.location.pathname)) {
        router.push("/signin");
      }
    }
    toast.error("Your session has expired. Please log in again.");
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      checkToken();
      
      const interval = setInterval(checkToken, 5 * 60 * 1000);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return <>{children}</>;
}
