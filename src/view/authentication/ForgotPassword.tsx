'use client';
import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Email from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

// PROJECT IMPORTS
import FormInput from '@/components/UIComponents/FormInput';

import {
  ForgotPasswordContainer,
  ForgotPasswordMainContainer,
  ForgotPasswordSubmitButton,
  ForgotPasswordTitle,
  LoginLink,
} from './authentication.styled';
import { forgotPasswordEmail } from '@/services/admin/userService';

// SERVICES

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email address is required'),
});

const ForgotPassword = () => {
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
    <ForgotPasswordMainContainer maxWidth="xs">
      <ForgotPasswordContainer>
        <ForgotPasswordTitle variant="h5">Forgot Password</ForgotPasswordTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Email input */}
            <Grid size={{ xs: 12 }}>
              <FormInput
                type="email"
                label="Email"
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
            </Grid>

            {/* Submit button */}
            <Grid size={{ xs: 12 }}>
              <ForgotPasswordSubmitButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Submit
              </ForgotPasswordSubmitButton>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ mt: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Remember your password?{' '}
          <LoginLink href={'/'}>
            <span className="underline">Login here</span>
          </LoginLink>
        </Typography>
      </ForgotPasswordContainer>
    </ForgotPasswordMainContainer>
  );
};

export default ForgotPassword;
