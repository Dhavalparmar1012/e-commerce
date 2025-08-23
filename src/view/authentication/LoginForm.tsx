// src/components/LoginForm.tsx
'use client';

'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Email from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Button, Link, Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import FormInput from '@/components/UIComponents/FormInput';
import { loginSchema } from '@/utils/validationSchemas';

export default function LoginForm() {
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
    <Box sx={{ width: '100%', maxWidth: 420 }}>
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormInput
              type="email"
              label="Email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              fullWidth
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
            <FormInput
              type={showPassword ? 'text' : 'password'}
              label="Password"
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
            <Box sx={{ textAlign: 'right' }}>
              <Link
                href="/forgot-password"
                underline="none"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#1976d2',
                  transition: 'all 0.3s',
                  '&:hover': { color: '#0d47a1', textDecoration: 'underline' },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              fullWidth
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
              Login
            </Button>

            <Typography variant="body2" textAlign="center" mt={3}>
              Don’t have an account?{' '}
              <Link
                href="/register"
                underline="none"
                sx={{
                  fontWeight: 600,
                  color: '#1976d2',
                  transition: 'all 0.3s',
                  '&:hover': { color: '#0d47a1' },
                }}
              >
                Create Account
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
