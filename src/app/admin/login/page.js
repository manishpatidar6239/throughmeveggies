"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAdmin } from "@/redux/reducers";
import api from "@/apiHandler/page";

// Dynamically import MUI components with no SSR
const Box = dynamic(() => import("@mui/material/Box"), { ssr: false });
const Button = dynamic(() => import("@mui/material/Button"), { ssr: false });
const Container = dynamic(() => import("@mui/material/Container"), {
  ssr: false,
});
const TextField = dynamic(() => import("@mui/material/TextField"), {
  ssr: false,
});
const Typography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});
const Paper = dynamic(() => import("@mui/material/Paper"), { ssr: false });
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress"),
  { ssr: false }
);
const Visibility = dynamic(() => import("@mui/icons-material/Visibility"), {
  ssr: false,
});
const VisibilityOff = dynamic(
  () => import("@mui/icons-material/VisibilityOff"),
  { ssr: false }
);
const IconButton = dynamic(() => import("@mui/material/IconButton"), {
  ssr: false,
});
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"), {
  ssr: false,
});

export default function AdminLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const adminToken = Cookies.get("AdminToken");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (adminToken) {
      router.push("/admin/dashboard");
    }
  }, [adminToken, router]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const { email, password } = formData;

    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        toast.success(response?.message);
        Cookies.set("AdminToken", response?.data?.token, {
          expires: 100 * 365,
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        dispatch(setAdmin(response.data));
        router.push("/admin/dashboard");
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" mb={3}>
            Admin Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="email"
              autoFocus
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={formData.showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="current-password"
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      disabled={isLoading}
                    >
                      {formData.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
