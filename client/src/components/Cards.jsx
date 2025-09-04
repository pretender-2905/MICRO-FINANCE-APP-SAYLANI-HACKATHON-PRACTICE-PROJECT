import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router';



function Cards({ type = 'CARD', description = '', period = '-', maxLimit = '-' }) {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [selectedCategory, changeSelectedCategory] = useState('');
  const [selectedSubCategory, changeSelectedSubCategory] = useState('');
  const category = ['Wedding', 'Education', 'Home Construction', 'Business Startup'];
  const weddingSubCategory = ['Nikah', 'Jahez', 'Valima'];
  const educationSubCategory = ['Undergraduate & Graduate Loans', 'Abroad Study Loans', 'Professional & Career Loans'];
  const homeConstructionCategory = ['Plot Purchase & Construction Loans', 'Self-Construction Loans', 'Home Renovation & Extension Loans'];
  const businessStartupCategory = ['New Business Loans', 'Equipment & Infrastructure Loans', 'Working Capital Loans'];
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [initialAmount, setInitialAmount] = useState(null);
  const [monthlyInstallment, setMonthlyInstallment] = useState(null);
  const [estimatedLoan, setEstimatedLoan] = useState(null);
  const navigate = useNavigate()
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // small screen check

  const handleCalculateLoanButton = () => {
    const initial = 0.25 * Number(loanAmount);
    const estimated = (Number(loanAmount) - initial) + 0.15 * Number(loanAmount);
    const monthly = estimated / Number(loanPeriod);
    setInitialAmount(initial.toFixed(2));
    setEstimatedLoan(estimated.toFixed(2));
    setMonthlyInstallment(monthly.toFixed(2));
  };

  let subCategories = [];
  switch (selectedCategory) {
    case 'Wedding':
      subCategories = weddingSubCategory;
      break;
    case 'Education':
      subCategories = educationSubCategory;
      break;
    case 'Home Construction':
      subCategories = homeConstructionCategory;
      break;
    case 'Business Startup':
      subCategories = businessStartupCategory;
      break;
    default:
      subCategories = [];
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 6,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <StarIcon sx={{ fontSize: isXs ? 36 : 48, mb: 1 }} />
          <Typography variant={isXs ? "h6" : "h5"} component="h3" sx={{ fontWeight: 'bold' }}>
            {type}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, minHeight: isXs ? 40 : 60 }}>
            {description}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon fontSize={isXs ? "small" : "medium"} />
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase' }}>
                    Repayment Period
                  </Typography>
                  <Typography variant={isXs ? "body2" : "subtitle1"}>{period}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoneyIcon fontSize={isXs ? "small" : "medium"} />
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase' }}>
                    Maximum Limit
                  </Typography>
                  <Typography variant={isXs ? "body2" : "subtitle1"}>{maxLimit}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Stack direction={isXs ? 'column' : 'row'} spacing={2}>
          <Button 
          onClick={()=> navigate('SignUp')}
          variant="contained" color="secondary" fullWidth>
            Apply Now
          </Button>
          <Button variant="outlined" color="inherit" fullWidth onClick={() => setIsCalcOpen(true)}>
            Calculate Loan
          </Button>
        </Stack>
      </Card>

      <Modal open={isCalcOpen} onClose={() => setIsCalcOpen(false)} aria-labelledby="loan-calculator-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isXs ? '90%' : 400,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: isXs ? 2 : 4,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="loan-calculator-title" variant="h6" component="h2" fontSize={isXs ? '1.25rem' : '1.5rem'}>
              Loan Calculator
            </Typography>
            <IconButton onClick={() => setIsCalcOpen(false)} aria-label="close" size={isXs ? 'small' : 'medium'}>
              <CloseIcon fontSize={isXs ? 'small' : 'medium'} />
            </IconButton>
          </Box>


          <Typography variant="body2" sx={{ mb: 2, color: "red" }}>
            *You have to deposit 25% of your loan amount as initial deposit.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "red" }}>
            *15% of your loan amount will be charged as interest.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            *Fill the details to calculate Loan
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Select Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label="Select Category"
              onChange={(e) => {
                changeSelectedCategory(e.target.value);
                changeSelectedSubCategory('');
              }}
              size={isXs ? 'small' : 'medium'}
            >
              {category.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedCategory}>
            <InputLabel id="subcategory-label">Select Sub Category</InputLabel>
            <Select
              required
              labelId="subcategory-label"
              value={selectedSubCategory}
              label="Select Sub Category"
              onChange={(e) => changeSelectedSubCategory(e.target.value)}
              size={isXs ? 'small' : 'medium'}
            >
              {subCategories.map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="number"
            label="Enter Loan Amount"
            variant="outlined"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            sx={{ mb: 2 }}
            size={isXs ? 'small' : 'medium'}
          />

          <TextField
            fullWidth
            type="number"
            label="Enter Period in months (e.g., 18)"
            variant="outlined"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
            sx={{ mb: 2 }}
            size={isXs ? 'small' : 'medium'}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleCalculateLoanButton}
            disabled={!loanAmount || !loanPeriod}
            sx={{
              backgroundColor: "#7b1fa2",
              "&:hover": {
                backgroundColor: "#4a0072",
              },
              py: isXs ? 1.5 : 2,
              fontSize: isXs ? '0.875rem' : '1rem',
            }}
            size={isXs ? 'small' : 'medium'}
          >
            Calculate Loan
          </Button>

          {initialAmount !== null && (

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                maxWidth: 360,
                mx: 'auto',
              }}
            >
              <Stack spacing={1}>
                <Typography variant={isXs ? 'body2' : 'body1'}>
                  <strong>Initial Amount:</strong> Rs {initialAmount}
                </Typography>
                <Typography variant={isXs ? 'body2' : 'body1'}>
                  <strong>Estimated Loan:</strong> Rs {estimatedLoan} <em>(15% included)</em>
                </Typography>
                <Typography variant={isXs ? 'body2' : 'body1'}>
                  <strong>Monthly Installment:</strong> Rs {monthlyInstallment}
                </Typography>
              </Stack>

               <Button
            variant="contained"
            fullWidth
            onClick={()=>{
              navigate('/SignUp')
            }}
            disabled={!loanAmount || !loanPeriod}
            sx={{
              marginTop: "15px",
              backgroundColor: "#7b1fa2",
              "&:hover": {
                backgroundColor: "#4a0072",
              },
              py: isXs ? 1.5 : 2,
              fontSize: isXs ? '0.875rem' : '1rem',
            }}
            size={isXs ? 'small' : 'medium'}
          >
            Proceed to Application
            
          </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Cards;
