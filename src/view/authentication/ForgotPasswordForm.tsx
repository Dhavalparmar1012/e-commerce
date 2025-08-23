'use client';
import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Email from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormInput from '@/components/UIComponents/FormInput';
import { forgotPasswordEmail } from '@/services/admin/userService';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email address is required'),
});

const ForgotPasswordForm = () => {
  const router = useRouter();

  const initialValues = {
    email: '',
  };

  const { errors, values, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  // Submit handler
  const handleSubmitForm = async (values: { email: string }) => {
    try {
      const res = await forgotPasswordEmail(values.email);

      if (typeof res !== 'string' && res.success) {
        toast.success('OTP sent to email');
        router.push(`/verify-otp?email=${values.email}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box sx={{ width: '100%', maxWidth: 420 }}>
      {/* Glassmorphism Card */}
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          p: 4,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.2)',
        }}
      >
        {/* Gradient Heading */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
          sx={{
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Forgot Password
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Enter your registered email, and we’ll send you a reset link.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormInput
              type="email"
              label="Email Address"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email ? errors.email : undefined}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              required
            />
            {/* Blue Gradient Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                py: 1.5,
                fontSize: 16,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                boxShadow: '0 6px 16px rgba(25,118,210,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
                  boxShadow: '0 8px 20px rgba(25,118,210,0.4)',
                },
              }}
            >
              Send Reset Link
            </Button>
          </Stack>
        </form>

        {/* Bottom Login Link */}
        <Typography variant="body2" textAlign="center" mt={3}>
          Remember your password?{' '}
          <Link
            href="/"
            underline="none"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              transition: 'all 0.3s',
              '&:hover': { color: '#0d47a1' },
            }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordForm;
