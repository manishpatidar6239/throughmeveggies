"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import api from "@/apiHandler/page";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, setAdmin } from "@/redux/reducers";

const drawerWidth = 240;

// Custom styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
    description: "View analytics and reports",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/admin/users",
    description: "Manage user accounts",
  },
  {
    text: "Products",
    icon: <ShoppingCartIcon />,
    path: "/admin/products",
    description: "Manage your products",
  },
  {
    text: "Categories",
    icon: <CategoryIcon />,
    path: "/admin/categories",
    description: "Organize product categories",
  },
  {
    text: "Subcategories",
    icon: <CategoryIcon />,
    path: "/admin/subcategories",
    description: "Organize product subcategories",
  },
  {
    text: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/admin/orders",
    description: "Manage your orders",
  },

  { divider: true },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/admin/settings",
    description: "System configuration",
  },
  {
    text: "Logout",
    icon: <LogoutIcon />,
    action: "logout",
    description: "Sign out from your account",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  minHeight: 64,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.common.white,
  boxShadow: theme.shadows[2],
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function AdminMainLayout({ children, window }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notifications] = React.useState([1, 2, 3]);
  const AdminToken = Cookies.get("AdminToken");
  const admin = useSelector(selectAdmin);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const { data, success, message } = await api.post(
        `/auth/logout/${AdminToken}`
      );
      console.log(data, success, message);
      if (success) {
        toast.success(data.message || "Successfully logged out");
        Cookies.remove("AdminToken", { path: "/" });
        dispatch(setAdmin(null));
        router.push("/admin/login");
      } else {
        toast.error(message || "Failed to logout");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Error during logout");
      // Still clear the token and redirect to login on error
      Cookies.remove("AdminToken", { path: "/" });
      dispatch(setAdmin(null));
      router.push("/admin/login");
    }
  };

  const handleNavigation = (item) => {
    if (item.action === "logout") {
      handleLogout();
    } else if (item.path) {
      router.push(item.path);
      if (window?.innerWidth < 600) {
        setMobileOpen(false);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log("Searching for:", searchQuery);
      // router.push(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
      }}
    >
      <DrawerHeader>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              mr: 1.5,
              bgcolor: "background.paper",
              color: theme.palette.primary.main,
              fontWeight: "bold",
              boxShadow: 1,
              fontSize: 14,
            }}
          >
            TMV
          </Avatar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              color: "white",
              fontSize: 18,
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            ThroughMeVegies
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              ml: "auto",
              color: "white",
              display: { sm: "none" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </DrawerHeader>

      <Box sx={{ p: 2, display: { sm: "none" } }}>
        <form onSubmit={handleSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </form>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, p: 1 }}>
        {menuItems.map((item, index) =>
          item.divider ? (
            <Divider
              key={`divider-${index}`}
              sx={{ my: 1, borderColor: "divider" }}
            />
          ) : (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ margin: "4px 0" }}
            >
              <ListItem
                disablePadding
                onClick={() => handleNavigation(item)}
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Tooltip
                  title={item.description}
                  placement="right"
                  arrow
                  disableHoverListener={!item.description}
                >
                  <ListItemButton
                    selected={pathname === item.path}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "& .MuiListItemIcon-root": {
                          color: "primary.contrastText",
                        },
                        "& .MuiTypography-root": {
                          fontWeight: 500,
                        },
                      },
                      borderRadius: 1,
                      transition: theme.transitions.create(
                        ["background-color", "transform"],
                        {
                          duration: theme.transitions.duration.shorter,
                        }
                      ),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          pathname === item.path
                            ? "primary.contrastText"
                            : "inherit",
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={500}>
                          {item.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </motion.div>
          )
        )}
      </List>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={admin?.avatar}
            alt={admin?.name?.charAt(0) || "U"}
            sx={{
              width: 40,
              height: 40,
              bgcolor: admin?.avatar ? "transparent" : "primary.main",
              color: admin?.avatar ? "inherit" : "primary.contrastText",
              mr: 1.5,
            }}
          >
            {admin?.name?.charAt(0) || "U"}
          </Avatar>
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap fontWeight={500}>
              {admin?.name || "Admin User"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {admin?.email || "admin@example.com"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        elevation={0}
      >
        <Toolbar disableGutters sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "text.primary",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <form onSubmit={handleSearch}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
            </form>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                color="inherit"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <StyledBadge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{
                  ml: 1,
                  p: 0.5,
                  border: `2px solid ${theme.palette.divider}`,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}`,
                  },
                }}
                aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                <Avatar
                  src={admin?.avatar}
                  alt={admin?.name?.charAt(0) || "U"}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: admin?.avatar ? "transparent" : "primary.main",
                    color: admin?.avatar ? "inherit" : "primary.contrastText",
                    fontWeight: 600,
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    transition: "transform 0.2s",
                  }}
                >
                  {admin?.name?.charAt(0) || "U"}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: "visible",
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={() => router.push("/admin/profile")}>
                <Avatar
                  src={admin?.avatar}
                  alt={admin?.name?.charAt(0) || "U"}
                  sx={{
                    bgcolor: admin?.avatar ? "transparent" : "primary.main",
                    color: admin?.avatar ? "inherit" : "primary.contrastText",
                  }}
                >
                  {admin?.name?.charAt(0) || "U"}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={500} noWrap>
                    {admin?.name || "Admin User"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {admin?.email || "admin@example.com"}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => router.push("/admin/settings")}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <Typography color="error">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "background.default",
          minHeight: "100vh",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{ height: "100%" }}
          >
            <Box
              sx={{
                maxWidth: 1400,
                mx: "auto",
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                minHeight: "calc(100vh - 100px)",
              }}
            >
              {children}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
