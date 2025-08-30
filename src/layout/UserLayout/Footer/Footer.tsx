// src\layout\UserLayout\Footer\Footer.tsx
'use client';
import React from 'react';
import { Container, Grid, Typography, Box, Link, styled } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', mt: 5, width: '100%' }}>
      <Container sx={{ textAlign: { xs: 'center', md: 'left' }, my: 5 }}>
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ABOUT
              </Typography>
              <Box sx={{ height: 2, width: 100, backgroundColor: 'white', my: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Link href="/" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Contact Us
                </Link>
                <Link href="/gallery" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  About Us
                </Link>
                <Link href="/art-of-mehndi" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Careers
                </Link>
                <Link href="/review" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Flipkart Stories
                </Link>
                <Link href="/contact" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Press
                </Link>
                <Link href="/contact" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Corporate Information
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Help Section */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                HELPS
              </Typography>
              <Box sx={{ height: 2, width: 100, backgroundColor: 'white', my: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Link href="/" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Payments
                </Link>
                <Link href="/gallery" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Shipping
                </Link>
                <Link href="/art-of-mehndi" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Cancellation & Returns
                </Link>
                <Link href="/review" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  FAQ
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Consumer Policy Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                CONSUMER POLICY
              </Typography>
              <Box sx={{ height: 2, width: 100, backgroundColor: 'white', my: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Typography>Cancellation & Returns</Typography>
                <Typography>Terms Of Use</Typography>
                <Typography>Security</Typography>
                <Typography>Privacy</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Follow Us / Address Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Follow us
              </Typography>
              <Box sx={{ height: 2, width: 100, backgroundColor: 'white', my: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Typography>
                  Flipkart Internet Private Limited, <br />
                  Building Alyssa, Begonia & <br />
                  Clove Embassy Tech Vilage, <br />
                  Bengaluru, 560103, <br />
                  Karnataka, India
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright Bar */}
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', textAlign: 'center', p: 3 }}>
        <Typography variant="body2">
          © 2024 Copyright:{' '}
          <Link href="https://mdbootstrap.com/" color="inherit">
            Mehndi Designer
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
