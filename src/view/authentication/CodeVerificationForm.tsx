'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

// MATERIAL - UI
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import OtpInput from 'react18-input-otp';
import { forgotPasswordEmail, otpVerification } from '@/services/admin/userService';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const CodeVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(300);
  const [isResending, setIsResending] = useState<boolean>(false);

  const handleVerifyOtp = async () => {
    try {
      const res = await otpVerification(otp);

      if (typeof res !== 'string' && res.success) {
        toast.success('OTP verified successfully');
        router.push(`/reset-password?email=${email}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const res = await forgotPasswordEmail(email);

      if (typeof res !== 'string' && res.success) {
        toast.success('OTP sent to email');
        setTimer(300);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
          textAlign: 'center',
        }}
      >
        {/* Gradient Heading */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
          sx={{
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Verify Code
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          We’ve sent a verification code to <strong>{email}</strong>
        </Typography>

        {/* OTP Input */}
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          isInputNum
          inputStyle={{
            width: '45px',
            height: '55px',
            borderRadius: '8px',
            border: '1px solid #1976d2',
            margin: '0 6px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1565c0',
          }}
          shouldAutoFocus
        />

        {/* Resend OTP */}
        <Box mt={3}>
          <Typography
            color={isResending ? 'text.disabled' : timer === 0 ? 'primary' : 'text.disabled'}
            sx={{
              cursor: timer === 0 && !isResending ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              '&:hover': {
                textDecoration: timer === 0 && !isResending ? 'underline' : 'none',
              },
            }}
            onClick={timer === 0 && !isResending ? handleResendOtp : undefined}
          >
            {isResending ? 'Resending...' : timer > 0 ? `Resend code in ${formatTime(timer)}` : 'Resend code'}
          </Typography>
        </Box>

        {/* Verify Button */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 3,
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
          onClick={handleVerifyOtp}
          disabled={otp.length !== 6}
        >
          Verify
        </Button>
      </Paper>
    </Box>
  );
};

export default CodeVerificationForm;
