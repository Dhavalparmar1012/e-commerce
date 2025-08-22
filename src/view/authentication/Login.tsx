'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Email from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import FormInput from '@/components/UIComponents/FormInput';
import { LoginContainer, LoginMainContainer, LoginSubmitButton, LoginTitle, RegisterLink } from './authentication.styled';
import { loginSchema } from '@/utils/validationSchemas';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const { errors, values, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (values: typeof initialValues) => {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid Credentials');
        return;
      }

      router.replace('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginMainContainer maxWidth="xs">
      <LoginContainer>
        <LoginTitle variant="h5">Login</LoginTitle>
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

            {/* Forgot Password link */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: ' #008cba',
                }}
              >
                <Link href="/forgot-password">Forgot Password?</Link>
              </Typography>
            </Grid>

            {/* Login button */}
            <Grid size={{ xs: 12 }}>
              <LoginSubmitButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Login
              </LoginSubmitButton>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mt: 1,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          Don&apos;t have an account?{' '}
          <RegisterLink href="/register">
            <span className="underline">Register</span>
          </RegisterLink>
        </Typography>
      </LoginContainer>
    </LoginMainContainer>
  );
};

export default Login;
