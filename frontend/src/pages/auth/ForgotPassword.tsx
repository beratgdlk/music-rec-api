import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Alert, 
  CircularProgress,
  Stack,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// SVG Icons
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#18181B" stroke="white" strokeWidth="2"/>
    <path d="M15 12L10.5 15V9L15 12Z" fill="white"/>
  </svg>
);

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A1A1A',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#333333',
    },
    '&:hover fieldset': {
      borderColor: '#555555',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D97706',
    },
    backgroundColor: '#1F1F1F',
  },
  '& .MuiInputLabel-root': {
    color: '#AAAAAA',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#D97706',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
});

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#D97706',
  color: 'black',
  padding: theme.spacing(1.5, 0),
  '&:hover': {
    backgroundColor: '#F59E0B',
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(217, 119, 6, 0.5)',
    color: 'rgba(0, 0, 0, 0.5)',
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(1.5, 0),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // API request would go here
      // await authApi.forgotPassword({ email });
      
      // Success simulation
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError('Failed to send password reset request. Please try again.');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header with logo and back button */}
      <Box component="header" sx={{ p: 2.5 }}>
        <Container maxWidth="sm">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Link to="/auth/login-form">
              <IconButton
                sx={{ 
                  backgroundColor: '#1A1A1A',
                  '&:hover': { backgroundColor: '#292929' }
                }}
                size="small"
              >
                <ArrowBackIcon sx={{ color: 'white' }} />
              </IconButton>
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LogoIcon />
              <Typography variant="body1" sx={{ ml: 1, fontWeight: 600 }}>
                TuneIn
              </Typography>
            </Box>
            <Box width={40} /> {/* Spacer for alignment */}
          </Stack>
        </Container>
      </Box>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <StyledPaper>
                <Box sx={{ textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 3 
                    }}
                  >
                    <CheckCircleOutlineIcon 
                      sx={{ 
                        fontSize: 56, 
                        color: '#D97706' 
                      }} 
                    />
                  </Box>
                  <Typography variant="h5" fontWeight={600} mb={2}>
                    Password Reset Email Sent
                  </Typography>
                  <Typography color="text.secondary" mb={4}>
                    We've sent password reset instructions to <b>{email}</b>. 
                    Please check your email and follow the instructions.
                  </Typography>
                  <Link to="/auth/login-form" style={{ textDecoration: 'none' }}>
                    <OutlineButton fullWidth>
                      Return to Login
                    </OutlineButton>
                  </Link>
                </Box>
              </StyledPaper>
            ) : (
              <Box>
                <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
                  Reset Your Password
                </Typography>
                
                <StyledPaper>
                  <form onSubmit={handleSubmit}>
                    <Typography color="text.secondary" mb={3}>
                      Enter your email address and we'll send you instructions to reset your password.
                    </Typography>
                    
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert 
                          severity="error" 
                          sx={{ 
                            mb: 3,
                            backgroundColor: 'rgba(127, 29, 29, 0.2)',
                            color: '#f87171',
                            border: '1px solid rgba(127, 29, 29, 0.5)',
                          }}
                        >
                          {error}
                        </Alert>
                      </motion.div>
                    )}
                    
                    <StyledTextField
                      fullWidth
                      id="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      margin="normal"
                      required
                      sx={{ mb: 3 }}
                    />
                    
                    <PrimaryButton
                      type="submit"
                      fullWidth
                      disabled={isLoading}
                      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </PrimaryButton>
                    
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Link 
                        to="/auth/login-form" 
                        style={{ 
                          color: '#D97706', 
                          textDecoration: 'none' 
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            '&:hover': { 
                              color: '#F59E0B' 
                            } 
                          }}
                        >
                          Return to login
                        </Typography>
                      </Link>
                    </Box>
                  </form>
                </StyledPaper>
              </Box>
            )}
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgotPassword; 