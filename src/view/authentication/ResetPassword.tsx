'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';

// PROJECT IMPORTS
import FormInput from '@/components/UIComponents/FormInput';
import {
  LoginLink,
  ResetPasswordContainer,
  ResetPasswordEmailSection,
  ResetPasswordMainContainer,
  ResetPasswordSubmitButton,
  ResetPasswordTitle,
} from './authentication.styled';
import { resetPassword } from '@/services/admin/userService';

// TYPES

// Validation schema
const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  cPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), ''], 'New password does not match'),
});

const ResetPassword = () => {
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
    <ResetPasswordMainContainer maxWidth="xs">
      <ResetPasswordContainer>
        <ResetPasswordTitle variant="h4">Reset Your Password</ResetPasswordTitle>
        <ResetPasswordEmailSection>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Account:
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {email}
          </Typography>
        </ResetPasswordEmailSection>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Password input */}
            <Grid size={{ xs: 12 }}>
              <FormInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
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
            </Grid>

            {/* Confirm Password input */}
            <Grid size={{ xs: 12 }}>
              <FormInput
                type={showPassword ? 'text' : 'password'}
                label="Confirm password"
                name="cPassword"
                id="cPassword"
                value={values.cPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cPassword && Boolean(errors.cPassword)}
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
            </Grid>

            {/* Submit button */}
            <Grid size={{ xs: 12 }}>
              <ResetPasswordSubmitButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Submit
              </ResetPasswordSubmitButton>
            </Grid>
          </Grid>
        </Box>

        <Box textAlign="center">
          <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Remember your password?{' '}
            <LoginLink href={'/'}>
              <span className="underline">Login here</span>
            </LoginLink>
          </Typography>
        </Box>
      </ResetPasswordContainer>
    </ResetPasswordMainContainer>
  );
};

export default ResetPassword;
