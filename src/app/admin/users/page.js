"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Add, Search, Edit, Delete, Close } from "@mui/icons-material";
import DynamicForm from "@/components/Admin/DynamicForm/DynamicForm";
import { DataTable, ConfirmationDialog } from "@/components/Admin";
import AdminMainLayout from "@/components/AdminMainLayout/page";
import { api } from "@/apiHandler/page";
import { toast } from "react-toastify";

export default function UsersPage() {
  const [state, setState] = useState({
    users: [],
    loading: true,
    page: 0,
    rowsPerPage: 10,
    totalRows: 0,
    searchTerm: "",
    selected: [],
  });
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const confirmDialog = useRef();

  const controllerRef = useRef(null);

  // Debounce search with request cancellation
  useEffect(() => {
    // Cancel previous request if it exists
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create new AbortController for this request
    controllerRef.current = new AbortController();

    // Only search if search term is empty or has at least 2 characters
    const shouldSearch = !state.searchTerm || state.searchTerm.length >= 2;

    const timer = setTimeout(() => {
      if (shouldSearch) {
        fetchUsers(controllerRef.current.signal);
      } else if (state.searchTerm === "") {
        // If search is cleared, reset and fetch all users
        fetchUsers(controllerRef.current.signal);
      }
    }, 300); // Reduced debounce time for better UX

    return () => {
      clearTimeout(timer);
      // Don't abort here as we want to cancel in the effect cleanup
    };
  }, [state.page, state.rowsPerPage, state.searchTerm]);

  const fetchUsers = async (signal) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      // Build query parameters
      const params = new URLSearchParams({
        page: state.page + 1,
        limit: state.rowsPerPage,
      });

      // Add search term if it exists
      if (state.searchTerm) {
        params.append("search", state.searchTerm);
      }

      const response = await api.get(`/users?${params.toString()}`, { signal });

      console.log("response:", response);

      if (response.success) {
        setState((prev) => ({
          ...prev,
          users: response.data.users,
          totalRows: response.data.pagination.totalResults,
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setState((prev) => ({ ...prev, loading: false }));
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handlePageChange = (event, newPage) => {
    setState((prev) => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (event) => {
    const rowsPerPage =
      typeof event === "object" && event?.target?.value
        ? parseInt(event.target.value, 10)
        : parseInt(event, 10);

    setState((prev) => ({
      ...prev,
      rowsPerPage,
      page: 0,
    }));
  };

  const handleSearch = (e) => {
    setState((prev) => ({
      ...prev,
      searchTerm: e.target.value,
      page: 0,
    }));
  };

  const handleDeleteClick = async (user) => {
    const confirmed = await confirmDialog.current.show({
      title: "Delete User",
      message: `Are you sure you want to delete ${user.name}?`,
      confirmText: "Delete",
      confirmColor: "error",
    });

    if (confirmed) {
      try {
        await api.delete(`/users/${user._id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddUser = () => {
    setUserToUpdate(null);
    setOpenForm(true);
  };

  const handleEditUser = (user) => {
    setUserToUpdate(user);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setUserToUpdate(null);
  };

  const handleSubmitUser = async (data) => {
    const isUpdate = Boolean(userToUpdate);
    const endpoint = isUpdate
      ? `/auth/update-details/${userToUpdate._id}`
      : "/auth/register";
    const method = isUpdate ? "put" : "post";
    const successMessage = isUpdate
      ? "User updated successfully"
      : "User created successfully";

    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        ...(!isUpdate && { password: data.password }), // Only include password for new users
      };

      const response = await api[method](endpoint, payload);

      if (!response.success) {
        const errorMessage = Array.isArray(response.message)
          ? response.message.join(". ")
          : response.message;
        throw new Error(errorMessage);
      }

      toast.success(response.message || successMessage);
      fetchUsers();
      handleCloseForm();
    } catch (error) {
      console.error(`Error ${isUpdate ? "updating" : "saving"} user:`, error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  const filteredUsers = state.users.filter(
    (user) =>
      user.name?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "user",
      headerName: "User",
      flex: 1,
      minWidth: 240,
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}>
          <Avatar
            src={row.avatar}
            alt={row.name}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {row.name ? row.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                color: "text.primary",
                lineHeight: 1.3,
                textTransform: "capitalize",
              }}
            >
              {row.name || "Unknown User"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontSize: "0.7rem",
                lineHeight: 1.3,
                mt: 0.25,
              }}
            >
              ID: {row._id?.substring(0, 8)}...
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
            fontSize: "0.875rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          {row.email}
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 140,
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          {row.phone || (
            <Box component="span" sx={{ opacity: 0.6 }}>
              N/A
            </Box>
          )}
        </Typography>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      headerAlign: "center",
      align: "center",
      render: (row) => {
        const role = row.role?.toLowerCase() || "user";
        const roleConfig = {
          admin: { bg: "#1976d2", hover: "#1565c0" },
          user: { bg: "#4caf50", hover: "#388e3c" },
        };

        const config = roleConfig[role];
        const displayRole = role.charAt(0).toUpperCase() + role.slice(1);

        return (
          <Chip
            label={displayRole}
            size="small"
            variant="filled"
            sx={{
              fontWeight: 500,
              minWidth: 70,
              color: "white",
              backgroundColor: config.bg,
              "&:hover": { backgroundColor: config.hover },
              "& .MuiChip-label": { px: 1.5, py: 0.5 },
            }}
          />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.825rem",
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      align: "right",
      render: (row) => (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pr: 1 }}
        >
          <Tooltip title="Edit user">
            <IconButton
              size="small"
              onClick={() => handleEditUser(row)}
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "primary.main",
                },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete user">
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(row)}
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "error.main",
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <AdminMainLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" component="h1">
            Users
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>

        <Box
          elevation={0}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: 1,
            },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users by name, email, or phone..."
            value={state.searchTerm}
            onChange={handleSearch}
            disabled={state.loading}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "background.paper",
                "&:hover fieldset": {
                  borderColor: "primary.light",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    color="action"
                    sx={{
                      color: "text.secondary",
                      ...(state.loading && { color: "primary.main" }),
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: state.loading && (
                <InputAdornment position="end">
                  <CircularProgress size={20} thickness={4} />
                </InputAdornment>
              ),
            }}
            helperText={
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color:
                    state.searchTerm && state.searchTerm.length < 2
                      ? "text.secondary"
                      : "transparent",
                  fontSize: "0.75rem",
                  height: "1.2rem", // Prevent layout shift
                }}
              >
                {
                  state.searchTerm && state.searchTerm.length < 2
                    ? "Type at least 2 characters to search"
                    : " " // Empty space to maintain consistent height
                }
              </Box>
            }
          />

          <DataTable
            columns={columns}
            data={state.users || []}
            loading={state.loading}
            page={state.page}
            rowsPerPage={state.rowsPerPage}
            totalRows={state.totalRows}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            emptyMessage="No users found"
          />
        </Box>

        <ConfirmationDialog ref={confirmDialog} />

        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {userToUpdate ? "Edit User" : "Add New User"}
            <IconButton
              aria-label="close"
              onClick={handleCloseForm}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DynamicForm
              fields={[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  required: true,
                  gridProps: { size: { xs: 12, sm: 12, md: 6 } },
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                  gridProps: { size: { xs: 12, sm: 12, md: 6 } },
                },
                ...(!userToUpdate
                  ? [
                      {
                        name: "password",
                        label: "Password",
                        type: "password",
                        required: true,
                        gridProps: { size: { xs: 12, sm: 12, md: 6 } },
                      },
                    ]
                  : []),
                {
                  name: "phone",
                  label: "Phone Number",
                  type: "tel",
                  required: true,
                  gridProps: { size: { xs: 12, sm: 12, md: 6 } },
                },
                {
                  name: "role",
                  label: "Role",
                  type: "select",
                  options: [
                    { value: "user", label: "User" },
                    { value: "admin", label: "Admin" },
                  ],
                  required: true,
                  gridProps: { size: { xs: 12, sm: 12, md: 6 } },
                },
              ]}
              initialValues={
                userToUpdate || {
                  name: "",
                  email: "",
                  phone: "",
                  role: "user",
                  password: "",
                }
              }
              onSubmit={handleSubmitUser}
              onCancel={handleCloseForm}
              submitText={userToUpdate ? "Update User" : "Add User"}
              validationSchema={{
                email: [
                  {
                    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                    message: "Please enter a valid email address",
                  },
                ],
                phone: [
                  {
                    test: (value) => !value || /^[0-9+\-\s()]*$/.test(value),
                    message: "Please enter a valid phone number",
                  },
                ],
                ...(!userToUpdate && {
                  password: [
                    {
                      test: (value) => value && value.length >= 6,
                      message: "Password must be at least 6 characters long",
                    },
                  ],
                }),
              }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </AdminMainLayout>
  );
}
