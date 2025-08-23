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
import { registerUser } from '@/services/admin/userService';
import { registerSchema } from '@/utils/validationSchemas';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const RegisterForm = () => {
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
          Create Your Account
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Join us today and shop the finest sarees with exclusive offers.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
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
              Register
            </Button>
          </Stack>
        </form>

        {/* Bottom Login Link */}
        <Typography variant="body2" textAlign="center" mt={3}>
          Already have an account?{' '}
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
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
