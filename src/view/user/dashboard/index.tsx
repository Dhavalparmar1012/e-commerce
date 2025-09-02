'use client';
import { Box, Typography, Grid, Container } from '@mui/material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { offers, sarees } from '@/constants/sarees.constant';
import BannerSlider from './BannerSlider';
import TestimonialMarquee from './TestimonialMarquee';
import SareeCard from './SareeCard';
import OfferCard from './OfferCard';
import { banners } from '@/constants/banners.contants';
import { testimonials } from '@/constants/testimonials.constants';

const Dashboard = () => {
  return (
    <>
      <Container>
        {/* Banner Slider */}
        <BannerSlider banners={banners} />

        {/* Offer Strip */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {offers.map((offer, i) => (
            <Grid size={{ xs: 12, sm: 4 }} key={i}>
              <OfferCard {...offer} />
            </Grid>
          ))}
        </Grid>

        {/* Product Grid */}
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
          Best Selling Sarees
        </Typography>

        <Grid container spacing={3}>
          {sarees.map((saree) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={saree.id}>
              <SareeCard saree={saree} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          What Our Customers Say 💬
        </Typography>
        <TestimonialMarquee items={testimonials} />
        <TestimonialMarquee items={testimonials} direction="right" />
      </Box>
    </>
  );
};

export default Dashboard;
