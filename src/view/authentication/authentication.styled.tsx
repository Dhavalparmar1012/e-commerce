import Link from 'next/link';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// PROJECT IMPORTS
import theme from '@/themes/theme';

// Login
export const LoginMainContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const LoginContainer = styled(Box)(() => ({
  border: '1px solid',
  borderColor: '#008cba',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(3),
  width: '100%',
}));

export const LoginTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#1976D2',
}));

export const LoginSubmitButton = styled(Button)(() => ({
  backgroundColor: '#008cba',
  color: '#fff',
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#0078a8',
  },
}));

export const RegisterLink = styled(Link)(() => ({
  color: ' #008cba',
  fontWeight: 'bold',
  textDecoration: 'underline',
}));

// Register
export const RegisterMainContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const RegisterContainer = styled(Box)(() => ({
  border: '1px solid',
  borderColor: '#008cba',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(3),
  width: '100%',
}));

export const RegisterTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#1976D2',
}));

export const RegisterSubmitButton = styled(Button)(() => ({
  backgroundColor: '#008cba',
  color: '#fff',
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#0078a8',
  },
}));

export const LoginLink = styled(Link)(() => ({
  color: ' #008cba',
  fontWeight: 'bold',
  textDecoration: 'underline',
}));

// Forgot Password
export const ForgotPasswordMainContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const ForgotPasswordContainer = styled(Box)(() => ({
  border: '1px solid',
  borderColor: '#008cba',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(3),
  width: '100%',
}));

export const ForgotPasswordTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#1976D2',
}));

export const ForgotPasswordSubmitButton = styled(Button)(() => ({
  backgroundColor: '#008cba',
  color: '#fff',
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#0078a8',
  },
}));

// Code Verification
export const CodeVerificationMainContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const CodeVerificationContainer = styled(Box)(() => ({
  border: '1px solid',
  borderColor: '#008cba',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(3),
  width: '100%',
}));

export const CodeVerificationTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#1976D2',
}));

export const CodeVerificationEmailSection = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.62),
  backgroundColor: '#e3f2fd',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  borderRadius: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
}));

export const CodeVerificationSubmitButton = styled(Button)(() => ({
  backgroundColor: '#008cba',
  color: '#fff',
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#0078a8',
  },
}));

// Reset Password
export const ResetPasswordMainContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const ResetPasswordContainer = styled(Box)(() => ({
  border: '1px solid',
  borderColor: '#008cba',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(3),
  width: '100%',
}));

export const ResetPasswordTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#1976D2',
}));

export const ResetPasswordSubmitButton = styled(Button)(() => ({
  backgroundColor: '#008cba',
  color: '#fff',
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#0078a8',
  },
}));

export const ResetPasswordEmailSection = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.62),
  backgroundColor: '#e3f2fd',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  borderRadius: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
}));
