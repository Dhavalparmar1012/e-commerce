'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import FormInput from '@/components/UIComponents/FormInput';
import { resetPassword } from '@/services/admin/userService';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  cPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), ''], 'New password does not match'),
});
const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    password: '',
    cPassword: '',
  };

  const { errors, values, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (values: typeof initialValues) => {
    try {
      const res = await resetPassword(email, values.password);

      if (typeof res !== 'string' && res.success) {
        toast.success('Password reset successfully');
        router.push(`/`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    // Adding event listener to prevent back navigation
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
      router.push('/');
    };

    // Optional: Preventing the page from being unloaded (optional for extra safety)
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);
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
          Reset Password
        </Typography>

        {/* Account Info */}
        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Account: <strong>{email}</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormInput
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              fullWidth
              helperText={touched.password ? errors.password : undefined}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? <LockOpenIcon color="primary" /> : <LockIcon color="primary" />}
                  </InputAdornment>
                ),
              }}
              required
            />

            <FormInput
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              name="cPassword"
              id="cPassword"
              value={values.cPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cPassword && Boolean(errors.cPassword)}
              fullWidth
              helperText={touched.cPassword ? errors.cPassword : undefined}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? <LockOpenIcon color="primary" /> : <LockIcon color="primary" />}
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
              Update Password
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

export default ResetPasswordForm;
