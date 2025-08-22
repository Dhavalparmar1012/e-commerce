'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Email from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import FormInput from '@/components/UIComponents/FormInput';
import { LoginLink, RegisterContainer, RegisterMainContainer, RegisterSubmitButton, RegisterTitle } from './authentication.styled';
import { registerUser } from '@/services/admin/userService';
import Grid from '@mui/material/Grid';
import { registerSchema } from '@/utils/validationSchemas';

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { errors, values, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (values: typeof initialValues) => {
    try {
      const res = await registerUser(values);
      if (typeof res !== 'string' && res.success) {
        toast.success('User registered successfully');
        router.push('/');
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
    <RegisterMainContainer maxWidth="xs">
      <RegisterContainer>
        <RegisterTitle variant="h5">Register</RegisterTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Name input */}
            <Grid size={{ xs: 12 }}>
              <FormInput
                label="Name"
                name="name"
                id="name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : undefined}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>

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

            {/* Password input */}
            <Grid size={{ xs: 12 }}>
              <FormInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                id="password"
                fullWidth
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

            <Grid size={{ xs: 12 }}>
              <FormInput
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                fullWidth
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword ? errors.confirmPassword : undefined}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setShowConfirmPassword((s) => !s)}>
                      {showConfirmPassword ? <LockOpenIcon color="primary" /> : <LockIcon color="primary" />}
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>

            {/* Register button */}
            <Grid size={{ xs: 12 }}>
              <RegisterSubmitButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Register
              </RegisterSubmitButton>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ mt: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Already have an account?{' '}
          <LoginLink href={'/'}>
            <span className="underline">Login</span>
          </LoginLink>
        </Typography>
      </RegisterContainer>
    </RegisterMainContainer>
  );
};

export default Register;
