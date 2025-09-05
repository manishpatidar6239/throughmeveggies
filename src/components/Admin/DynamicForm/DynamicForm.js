import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Divider,
  IconButton,
  CircularProgress,
  Fade,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

const DynamicForm = ({
  fields = [],
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  validationSchema,
  title,
  showActions = true,
  submitButtonProps = {},
  cancelButtonProps = {},
}) => {
  const [formState, setFormState] = useState({
    isSubmitting: false,
    error: null,
  });
  const [showPassword, setShowPassword] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const validateField = (name, value) => {
    if (!validationSchema || !validationSchema[name]) return true;

    const rules = validationSchema[name];
    const errorMessages = [];

    for (const rule of rules) {
      const { test, message } = rule;
      if (!test(value)) {
        errorMessages.push(message);
      }
    }

    return errorMessages.length === 0 ? true : errorMessages[0];
  };

  const handleFormSubmit = async (data) => {
    try {
      setFormState({ ...formState, isSubmitting: true, error: null });

      // Validate all fields
      let isValid = true;
      const fieldErrors = {};

      for (const field of fields) {
        const { name, required } = field;
        const value = data[name];

        // Check required fields
        if (
          required &&
          (value === "" || value === undefined || value === null)
        ) {
          fieldErrors[name] = { message: "This field is required" };
          isValid = false;
          continue;
        }

        // Run custom validation if exists
        if (validationSchema && validationSchema[name]) {
          const validationResult = validateField(name, value);
          if (validationResult !== true) {
            fieldErrors[name] = { message: validationResult };
            isValid = false;
          }
        }
      }

      if (!isValid) {
        // Set all field errors at once
        Object.entries(fieldErrors).forEach(([fieldName, error]) => {
          setError(fieldName, { type: "manual", message: error.message });
        });
        return;
      }

      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState({
        ...formState,
        error: error.message || "An error occurred while submitting the form",
      });
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleFieldChange = (field, onChange, e) => {
    const { name, type } = field;
    let value = e?.target ? e.target.value : e;

    // Handle different input types
    if (type === "checkbox" && e?.target) {
      value = e.target.checked;
    }

    // Update the field value
    onChange(e);

    // Clear any existing errors for this field
    if (errors[name]) {
      clearErrors(name);
    }

    // Run validation if needed
    if (validationSchema && validationSchema[name]) {
      const validationResult = validateField(name, value);
      if (validationResult !== true) {
        setError(name, { type: "manual", message: validationResult });
      }
    }
  };

  const renderField = (field, index) => {
    const {
      type = "text",
      name,
      options,
      gridProps = { xs: 12, sm: 6, md: 6 },
      ...fieldProps
    } = field;

    // Convert gridProps to Grid2 compatible format

    const error = errors[name];
    const helperText = error ? error.message : field.helperText;

    switch (type) {
      case "select":
        return (
          <Grid {...gridProps} key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!error}
                  disabled={field.disabled}
                >
                  <InputLabel id={`${name}-label`}>
                    {field.label} {field.required && "*"}
                  </InputLabel>
                  <Select
                    labelId={`${name}-label`}
                    id={name}
                    value={value || (field.multiple ? [] : "")}
                    onChange={(e) => {
                      handleFieldChange(field, onChange, e);
                      field.onChange?.(e);
                    }}
                    onBlur={() => trigger(name)}
                    multiple={field.multiple}
                    label={`${field.label} ${field.required ? "*" : ""}`}
                    error={!!error}
                    {...fieldProps}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
        );

      case "checkbox":
        return (
          <Grid {...gridProps} key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!value}
                      onChange={(e) => {
                        const newValue = e.target.checked;
                        onChange(newValue);
                        field.onChange?.(e);
                        handleFieldChange(field, () => {}, {
                          target: { value: newValue },
                        });
                      }}
                      disabled={field.disabled}
                      {...fieldProps}
                    />
                  }
                  label={
                    <>
                      {field.label}{" "}
                      {field.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </>
                  }
                />
              )}
            />
            {helperText && (
              <FormHelperText error={!!error}>{helperText}</FormHelperText>
            )}
          </Grid>
        );

      case "array":
        return (
          <Grid key={name}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="subtitle1">
                  {field.label} {field.required && "*"}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    const currentValue = watch(name) || [];
                    const newItem = field.defaultItem || "";
                    setValue(name, [...currentValue, newItem]);
                  }}
                >
                  Add Item
                </Button>
              </Box>

              <Box>
                {(watch(name) || []).map((item, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={1}>
                    <Controller
                      name={`${name}[${index}]`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          value={value || ""}
                          onChange={(e) => {
                            onChange(e);
                            field.onChange?.(e);
                            handleFieldChange(field, () => {}, e);
                          }}
                          onBlur={() => trigger(`${name}[${index}]`)}
                          error={!!error?.[index]}
                          helperText={error?.[index]?.message}
                          {...fieldProps}
                        />
                      )}
                    />
                    <IconButton
                      onClick={() => {
                        const currentValue = watch(name) || [];
                        const newValue = [...currentValue];
                        newValue.splice(index, 1);
                        setValue(name, newValue);
                      }}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              {helperText && (
                <FormHelperText error={!!error}>
                  {Array.isArray(helperText)
                    ? helperText.join(" ")
                    : helperText}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
        );
      case "password":
        return (
          <Grid {...gridProps} key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={
                    <>
                      {field.label}{" "}
                      {field.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </>
                  }
                  value={value || ""}
                  onChange={(e) => {
                    handleFieldChange(field, onChange, e);
                    field.onChange?.(e);
                  }}
                  onBlur={() => trigger(name)}
                  type={showPassword[name] ? "text" : "password"}
                  error={!!error}
                  helperText={helperText}
                  disabled={field.disabled}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword((prev) => ({
                              ...prev,
                              [name]: !prev[name],
                            }));
                          }}
                          edge="end"
                        >
                          {showPassword[name] ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...fieldProps}
                />
              )}
            />
          </Grid>
        );
      default:
        return (
          <Grid {...gridProps} key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={
                    <>
                      {field.label}{" "}
                      {field.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </>
                  }
                  value={value || ""}
                  onChange={(e) => {
                    handleFieldChange(field, onChange, e);
                    field.onChange?.(e);
                  }}
                  onBlur={() => trigger(name)}
                  type={type}
                  error={!!error}
                  helperText={helperText}
                  disabled={field.disabled}
                  {...fieldProps}
                />
              )}
            />
          </Grid>
        );
    }
  };

  return (
    <Fade in={true} timeout={300}>
      <Paper elevation={0}>
        {title && (
          <>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Divider sx={{ mb: 3 }} />
          </>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            {fields.map((field, index) => (
              <React.Fragment key={`${field.name || "field"}-${index}`}>
                {renderField(field, index)}
                {/* Add responsive line breaks */}
                {(index + 1) % 2 === 0 && (
                  <>
                    {/* Hidden on md and up, visible on sm and xs */}
                    <Grid
                      xs={12}
                      sx={{ display: { xs: "block", md: "none" } }}
                    />
                    {/* Hidden on sm and up, only visible on xs */}
                    <Grid
                      xs={12}
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                  </>
                )}
              </React.Fragment>
            ))}
          </Grid>

          {formState.error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {formState.error}
            </Typography>
          )}

          {showActions && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
                pt: 2,
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              {onCancel && (
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={formState.isSubmitting}
                  startIcon={<Cancel />}
                  {...(cancelButtonProps || {})}
                >
                  {cancelText}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formState.isSubmitting}
                startIcon={
                  formState.isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Save />
                  )
                }
                {...(submitButtonProps || {})}
              >
                {submitText}
              </Button>
            </Box>
          )}
        </form>
      </Paper>
    </Fade>
  );
};

export default DynamicForm;
