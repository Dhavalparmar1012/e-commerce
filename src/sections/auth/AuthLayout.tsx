'use client';

import { ReactNode } from 'react';
import { Grid, useTheme } from '@mui/material';
import ProductReviewSlider from '@/view/productReviewSlider';

interface AuthLayoutProps {
  content: ReactNode;
}

export default function AuthLayout({ content }: AuthLayoutProps) {
  const theme = useTheme();

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side - Auth Box */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.default,
          p: { xs: 3, md: 6 },
        }}
      >
        {content}
      </Grid>

      {/* Right Side - Product Slider */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fce4ec, #f3e5f5)',
          p: { xs: 3, md: 6 },
        }}
      >
        <ProductReviewSlider />
      </Grid>
    </Grid>
  );
}
