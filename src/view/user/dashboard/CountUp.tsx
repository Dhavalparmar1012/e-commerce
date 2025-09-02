'use client';
import React from 'react';
import CountUp from 'react-countup';
import { Grid, Typography, Box, Card, Avatar } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

type CountUpCardProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string; // accepts theme color like "primary.main"
};

const CountUpCard = ({ title, count, icon, color }: CountUpCardProps) => (
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: 'center',
        backgroundColor: 'background.paper',
      }}
    >
      <Avatar sx={{ bgcolor: color, mb: 2, width: 56, height: 56 }}>{icon}</Avatar>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <Typography variant="h4" color={color} fontWeight="bold">
        <CountUp start={0} end={count} duration={2.5} separator="," />
      </Typography>
    </Card>
  </Grid>
);

const CountUpExample = () => (
  <Box sx={{ px: { xs: 2, md: 10 }, py: 6 }}>
    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
      Trusted by Thousands 💎
    </Typography>
    <Typography variant="subtitle1" align="center" color="text.secondary" mb={4}>
      Our growing community of happy customers across platforms
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      <CountUpCard title="Order" count={1500} icon={<InstagramIcon />} color="primary.main" />
      <CountUpCard title="Woman's Reseller Family" count={500} icon={<PhoneInTalkIcon />} color="success.main" />
      <CountUpCard title="Town Covered" count={2000} icon={<FacebookIcon />} color="secondary.main" />
    </Grid>
  </Box>
);

export default CountUpExample;
