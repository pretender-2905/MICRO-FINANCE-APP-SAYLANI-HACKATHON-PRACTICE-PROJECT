

import React, { useState } from 'react';
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  Paper,
  Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { AppRoutes } from '../constants/constant';
import Cookies from "js-cookie";
import SuccessPopup from '../components/SuccessPopup';

// Create theme with custom color
const theme = createTheme({
  palette: {
    primary: {
      main: '#715dbc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const LoanRequestForm = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  // User info state
  const [userInfo, setUserInfo] = useState({
    name: '',
    cnic: '',
    category: '',
    subCategory: '',
    loanPeriod: '',
    amount: '',
  });

  // Guarantors state
  const [guarantors, setGuarantors] = useState([
    {
      name: '',
      email: '',
      cnic: '',
      address: '',
    },
    {
      name: '',
      email: '',
      cnic: '',
      address: '',
    }
  ]);

  // Form state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Sub-category options based on category
  const subCategories = {
    Wedding: ['Nikah', 'Jahez', 'Valima'],
    Education: ['UnderGraduate and Graduate Loans', 'Abroad Study Loans', 'Professional and Career Loans'],
    Home_Construction: ['Plot Purchase and Construction Loans', 'Self Construction Loan', 'Home Renovation and Extension Loans'],
    Business_Startup: []
  };

  // Handle user info change
  const handleUserInfoChange = (field) => (event) => {
    let value = event.target.value;

    // For loan period, only allow digits
    if (field === 'loanPeriod') {
      value = value.replace(/\D/g, ''); // Remove non-digit characters
    }

    setUserInfo(prev => ({ ...prev, [field]: value }));

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Update sub-category options when category changes
    if (field === 'category') {
      setUserInfo(prev => ({ ...prev, subCategory: '' }));
    }
  };

  // Handle guarantor change
  const handleGuarantorChange = (index, field) => (event) => {
    const value = event.target.value;
    const updatedGuarantors = [...guarantors];
    updatedGuarantors[index] = { ...updatedGuarantors[index], [field]: value };
    setGuarantors(updatedGuarantors);

    // Clear error when user types
    const errorKey = `guarantor${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  // CNIC validation
  const validateCNIC = (cnic) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const cnicRegex2 = /^\d{13}$/;
    return cnicRegex.test(cnic) || cnicRegex2.test(cnic);
  };

  // Email validation
  const validateEmail = (email) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Validate user info
    if (!userInfo.name) newErrors.name = 'Name is required';
    if (!validateCNIC(userInfo.cnic)) newErrors.cnic = 'CNIC must be 13 digits or formatted as 42201-3175572-7';
    if (!userInfo.category) newErrors.category = 'Category is required';
    if (!userInfo.subCategory) newErrors.subCategory = 'Sub-category is required';
    if (!userInfo.loanPeriod || Number(userInfo.loanPeriod) <= 0) newErrors.loanPeriod = 'Valid loan period in months is required';
    if (!userInfo.amount || Number(userInfo.amount) <= 0) newErrors.amount = 'Valid amount is required';

    // Validate guarantors
    guarantors.forEach((guarantor, index) => {
      if (!guarantor.name) newErrors[`guarantor${index}_name`] = 'Name is required';
      if (!validateEmail(guarantor.email)) newErrors[`guarantor${index}_email`] = 'Please enter a valid email address';
      if (!validateCNIC(guarantor.cnic)) newErrors[`guarantor${index}_cnic`] = 'CNIC must be 13 digits or formatted as 42201-3175572-7';
      if (!guarantor.address) newErrors[`guarantor${index}_address`] = 'Address is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  // Handle form submission
  const handleSubmitLoanRequest = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setAlert({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token");

      // ✅ Backend-compatible payload
      const payload = {
        category: userInfo.category,
        subcategory: userInfo.subCategory, // match backend schema
        amount: Number(userInfo.amount),
        period: Number(userInfo.loanPeriod), // match backend schema
      };

      // ✅ Submit loan request
      const res = await axios.post(AppRoutes.loanRequest, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ✅ Submit guarantors
      for (const g of guarantors) {
        await axios.post(AppRoutes.guarantors, g, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }



      // Show success message
      setAlert({
        open: true,
        message: 'Loan request submitted successfully!',
        severity: 'success'
      });

      // Reset form
      setUserInfo({
        name: '',
        cnic: '',
        category: '',
        subCategory: '',
        loanPeriod: '',
        amount: '',
      });
      setGuarantors([
        { name: '', email: '', cnic: '', address: '' },
        { name: '', email: '', cnic: '', address: '' }
      ]);

      setPopupOpen(true);

    } catch (error) {
      console.error("Error submitting loan request:", error);
      setAlert({
        open: true,
        message: 'Submission failed. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4, mb: 5 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary" align="center" fontWeight="bold">
            Loan Application
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Fill out the form below to submit your loan request
          </Typography>

          {alert.open && (
            <Alert severity={alert.severity} sx={{ mb: 3 }} onClose={() => setAlert({ ...alert, open: false })}>
              {alert.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmitLoanRequest}>
            {/* User Information Section */}
            <Typography variant="h5" component="h2" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
              User Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={userInfo.name}
                  onChange={handleUserInfoChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CNIC"
                  value={userInfo.cnic}
                  onChange={handleUserInfoChange('cnic')}
                  error={!!errors.cnic}
                  helperText={errors.cnic}
                  placeholder="42201-3175572-7"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={userInfo.category}
                    label="Category"
                    onChange={handleUserInfoChange('category')}
                    required
                  >
                    <MenuItem value="Wedding">Wedding</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Home_Construction">Home Construction</MenuItem>
                    <MenuItem value="Business_Startup">Business Startup</MenuItem>
                  </Select>
                  {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.subCategory} disabled={!userInfo.category}>
                  <InputLabel>Sub-category</InputLabel>
                  <Select
                    value={userInfo.subCategory}
                    label="Sub-category"
                    onChange={handleUserInfoChange('subCategory')}
                    required
                  >
                    {userInfo.category && subCategories[userInfo.category].map((subCat) => (
                      <MenuItem key={subCat} value={subCat}>{subCat}</MenuItem>
                    ))}
                  </Select>
                  {errors.subCategory && <Typography variant="caption" color="error">{errors.subCategory}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Loan Period (Months)"
                  value={userInfo.loanPeriod}
                  onChange={handleUserInfoChange('loanPeriod')}
                  error={!!errors.loanPeriod}
                  helperText={errors.loanPeriod}
                  placeholder="Enter months in digits"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={userInfo.amount}
                  onChange={handleUserInfoChange('amount')}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                  }}
                  required
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Guarantor Information Section */}
            <Typography variant="h5" component="h2" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
              Guarantor Information
            </Typography>

            {guarantors.map((guarantor, index) => (
              <Box key={index} sx={{ mb: 4, p: 3, backgroundColor: '#f9f9ff', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Guarantor {index + 1}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={guarantor.name}
                      onChange={handleGuarantorChange(index, 'name')}
                      error={!!errors[`guarantor${index}_name`]}
                      helperText={errors[`guarantor${index}_name`]}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={guarantor.email}
                      onChange={handleGuarantorChange(index, 'email')}
                      error={!!errors[`guarantor${index}_email`]}
                      helperText={errors[`guarantor${index}_email`]}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CNIC"
                      value={guarantor.cnic}
                      onChange={handleGuarantorChange(index, 'cnic')}
                      error={!!errors[`guarantor${index}_cnic`]}
                      helperText={errors[`guarantor${index}_cnic`]}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Address"
                      multiline
                      rows={3}
                      value={guarantor.address}
                      onChange={handleGuarantorChange(index, 'address')}
                      error={!!errors[`guarantor${index}_address`]}
                      helperText={errors[`guarantor${index}_address`]}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Button
              onClick={handleSubmitLoanRequest}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Loan Request'}
            </Button>
          </Box>
        </Paper>
      </Container>
      <SuccessPopup
        open={popupOpen}
      />
    </ThemeProvider>
  );
};




export default LoanRequestForm;