'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import OtpInput from 'react18-input-otp';

// PROJECT IMPORTS
import theme from '@/themes/theme';
import {
  CodeVerificationContainer,
  CodeVerificationEmailSection,
  CodeVerificationMainContainer,
  CodeVerificationSubmitButton,
  CodeVerificationTitle,
} from './authentication.styled';
import { forgotPasswordEmail, otpVerification } from '@/services/admin/userService';

// TYPES

const CodeVerification = () => {
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
    <CodeVerificationMainContainer maxWidth="xs">
      <CodeVerificationContainer>
        <CodeVerificationTitle variant="h5">Verify Your OTP</CodeVerificationTitle>
        <CodeVerificationEmailSection>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {email}
          </Typography>
        </CodeVerificationEmailSection>

        <Grid container spacing={2}>
          {/* Otp input */}
          <Grid size={{ xs: 12 }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{ justifyContent: 'space-between' }}
              inputStyle={{
                width: '100%',
                margin: '8px',
                padding: '10px',
                border: `1px solid #008cba`,
                borderRadius: 4,
                ':hover': {
                  borderColor: theme.palette.primary.main,
                },
              }}
              focusStyle={{
                outline: 'none',
                boxShadow: '#008cba',
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            />
          </Grid>

          {/* Submit button */}
          <Grid size={{ xs: 12 }}>
            <CodeVerificationSubmitButton
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleVerifyOtp}
            >
              Submit
            </CodeVerificationSubmitButton>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography>Not received Code?</Typography>
              <Typography
                variant="body1"
                sx={{
                  minWidth: 85,
                  ml: 2,
                  textDecoration: 'none',
                  cursor: timer === 0 && !isResending ? 'pointer' : 'not-allowed',
                }}
                color={isResending ? 'text.disabled' : timer === 0 ? 'primary' : 'text.disabled'}
                onClick={timer === 0 && !isResending ? handleResendOtp : undefined}
              >
                {isResending ? 'Resending...' : timer > 0 ? `Resend code in ${formatTime(timer)}` : 'Resend code'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CodeVerificationContainer>
    </CodeVerificationMainContainer>
  );
};

export default CodeVerification;
