'use client';
import React from 'react';

// MATERIAL - UI
import { Container, Grid, Typography, Box, Link } from '@mui/material';
import { HeadlinePink } from '@/components/common.styled';
import { FooterPageAddress, FooterPageLink } from './Footer.styled';
import UINewTypography from '@/components/UIComponents/UINewTypography';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', mt: 5, width: '100%' }}>
      <Container sx={{ textAlign: { xs: 'center', md: 'left' }, my: 5 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: {
                  xs: 'center',
                  sm: 'center',
                  md: 'flex-start',
                },
              }}
            >
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
                ABOUT
              </Typography>

              <HeadlinePink />
              <FooterPageLink>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Contact Us
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/gallery" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    About Us
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/art-of-mehndi" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Careers
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/review" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Flipkart Stories
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/contact" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Press
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/contact" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Corporate Information
                  </Link>
                </UINewTypography>
              </FooterPageLink>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: {
                  xs: 'center',
                  sm: 'center',
                  md: 'flex-start',
                },
              }}
            >
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
                Helps
              </Typography>
              <HeadlinePink />
              <FooterPageLink>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Payments
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/gallery" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Shipping
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/art-of-mehndi" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    Cancellation & Returns
                  </Link>
                </UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Link href="/review" sx={{ color: '#FFF', textDecoration: 'none' }}>
                    FAQ
                  </Link>
                </UINewTypography>
              </FooterPageLink>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: {
                  xs: 'center',
                  sm: 'center',
                  md: 'flex-start',
                },
              }}
            >
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
                CONSUMER POLICY
              </Typography>
              <HeadlinePink />
              <FooterPageAddress>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>Cancellation & Returns</UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>Terms Of Use</UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>Security</UINewTypography>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>Privacy</UINewTypography>
              </FooterPageAddress>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: {
                  xs: 'center',
                  sm: 'center',
                  md: 'flex-start',
                },
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                Follow us
              </Typography>
              <HeadlinePink />
              <FooterPageAddress>
                <UINewTypography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  Flipkart Internet Private Limited, <br />
                  Building Alyssa, Begonia & <br />
                  Clove Embassy Tech Vilage, <br />
                  Bengaluru, 560103, <br />
                  Karnataka, India
                </UINewTypography>
              </FooterPageAddress>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          p: 3,
        }}
      >
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
