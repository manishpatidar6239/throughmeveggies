import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Warning as WarningIcon, Close as CloseIcon } from '@mui/icons-material';

const ConfirmationDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    title: 'Are you sure?',
    message: 'This action cannot be undone.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmColor: 'primary',
    onConfirm: () => {},
    showCancel: true,
  });

  const show = (customConfig = {}) => {
    setConfig({
      ...config,
      ...customConfig,
    });
    setOpen(true);
  };

  const hide = () => setOpen(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await config.onConfirm();
      hide();
    } catch (error) {
      console.error('Error in confirmation action:', error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <Dialog
      open={open}
      onClose={!loading ? hide : null}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={loading}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <WarningIcon color="warning" sx={{ mr: 1 }} />
          <Typography variant="h6" component="span">
            {config.title}
          </Typography>
          {!loading && (
            <IconButton
              aria-label="close"
              onClick={hide}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{config.message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {config.showCancel && (
          <Button
            onClick={hide}
            color="inherit"
            disabled={loading}
            sx={{ minWidth: 100 }}
          >
            {config.cancelText}
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          color={config.confirmColor || 'primary'}
          variant="contained"
          disabled={loading}
          autoFocus
          sx={{ minWidth: 100 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            config.confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

ConfirmationDialog.displayName = 'ConfirmationDialog';

export default ConfirmationDialog;
