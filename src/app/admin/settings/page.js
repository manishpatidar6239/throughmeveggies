"use client";

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Switch, 
  FormControlLabel, 
  Alert, 
  CircularProgress,
  Snackbar,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Visibility, 
  VisibilityOff,
  Lock as LockIcon,
  Store as StoreIcon,
  Email as EmailIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import AdminMainLayout from '@/components/AdminMainLayout/page';
import { api } from '@/apiHandler/page';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Through Me Veggies',
    siteDescription: 'Fresh vegetables delivered to your doorstep',
    contactEmail: 'contact@throughmeveggies.com',
    contactPhone: '+1 234 567 8900',
    
    // Security Settings
    require2FA: false,
    passwordExpiryDays: 90,
    failedLoginAttempts: 5,
    
    // Notification Settings
    emailNotifications: true,
    orderNotifications: true,
    promotionNotifications: true,
    
    // Payment Settings
    currency: 'INR',
    paymentMethods: ['credit_card', 'debit_card', 'upi', 'net_banking'],
    razorpayKey: '',
    razorpaySecret: ''
  });

  useEffect(() => {
    // Simulate loading settings from API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <AdminMainLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </AdminMainLayout>
    );
  }

  return (
    <AdminMainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="settings tabs"
          >
            <Tab label="General" icon={<StoreIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" {...a11yProps(2)} />
            <Tab label="Payments" icon={<PaymentIcon />} iconPosition="start" {...a11yProps(3)} />
          </Tabs>
          
          <Divider />
          
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Site Name"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Site Description"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Contact Phone"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.require2FA}
                      onChange={handleChange}
                      name="require2FA"
                      color="primary"
                    />
                  }
                  label="Require Two-Factor Authentication"
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mt: -1, mb: 2 }}>
                  Add an extra layer of security by requiring a second form of verification.
                </Typography>
                
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Current Password"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="New Password"
                  margin="normal"
                  sx={{ mt: 2 }}
                />
                
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm New Password"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardHeader title="Email Notifications" />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                  label="Enable Email Notifications"
                  sx={{ display: 'block', mb: 2 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.orderNotifications}
                      onChange={handleChange}
                      name="orderNotifications"
                      color="primary"
                      disabled={!settings.emailNotifications}
                    />
                  }
                  label="Order Notifications"
                  sx={{ display: 'block', mb: 2, ml: 4 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.promotionNotifications}
                      onChange={handleChange}
                      name="promotionNotifications"
                      color="primary"
                      disabled={!settings.emailNotifications}
                    />
                  }
                  label="Promotion Notifications"
                  sx={{ display: 'block', ml: 4 }}
                />
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardHeader title="SMS Notifications" />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Enable SMS Notifications"
                  sx={{ display: 'block', mb: 2 }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mt: -1 }}>
                  Receive important updates via SMS
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  margin="normal"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </TextField>
                
                <TextField
                  fullWidth
                  label="Razorpay Key ID"
                  name="razorpayKey"
                  value={settings.razorpayKey}
                  onChange={handleChange}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Razorpay Key Secret"
                  name="razorpaySecret"
                  value={settings.razorpaySecret}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardHeader title="Payment Methods" />
                  <Divider />
                  <CardContent>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.paymentMethods.includes('credit_card')}
                          onChange={(e) => {
                            const updatedMethods = e.target.checked
                              ? [...settings.paymentMethods, 'credit_card']
                              : settings.paymentMethods.filter(m => m !== 'credit_card');
                            setSettings(prev => ({
                              ...prev,
                              paymentMethods: updatedMethods
                            }));
                          }}
                          color="primary"
                        />
                      }
                      label="Credit Card"
                      sx={{ display: 'block', mb: 1 }}
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.paymentMethods.includes('debit_card')}
                          onChange={(e) => {
                            const updatedMethods = e.target.checked
                              ? [...settings.paymentMethods, 'debit_card']
                              : settings.paymentMethods.filter(m => m !== 'debit_card');
                            setSettings(prev => ({
                              ...prev,
                              paymentMethods: updatedMethods
                            }));
                          }}
                          color="primary"
                        />
                      }
                      label="Debit Card"
                      sx={{ display: 'block', mb: 1 }}
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.paymentMethods.includes('upi')}
                          onChange={(e) => {
                            const updatedMethods = e.target.checked
                              ? [...settings.paymentMethods, 'upi']
                              : settings.paymentMethods.filter(m => m !== 'upi');
                            setSettings(prev => ({
                              ...prev,
                              paymentMethods: updatedMethods
                            }));
                          }}
                          color="primary"
                        />
                      }
                      label="UPI"
                      sx={{ display: 'block', mb: 1 }}
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.paymentMethods.includes('net_banking')}
                          onChange={(e) => {
                            const updatedMethods = e.target.checked
                              ? [...settings.paymentMethods, 'net_banking']
                              : settings.paymentMethods.filter(m => m !== 'net_banking');
                            setSettings(prev => ({
                              ...prev,
                              paymentMethods: updatedMethods
                            }));
                          }}
                          color="primary"
                        />
                      }
                      label="Net Banking"
                      sx={{ display: 'block' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Paper>
        
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Settings saved successfully!
          </Alert>
        </Snackbar>
        
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </AdminMainLayout>
  );
}
