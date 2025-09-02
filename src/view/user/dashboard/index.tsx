'use client';
import { Box, Typography, Grid } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { offers, sarees } from '@/constants/sarees.constant';
import BannerSlider from './BannerSlider';
import TestimonialMarquee from './TestimonialMarquee';
import SareeCard from './SareeCard';
import OfferCard from './OfferCard';
import { banners } from '@/constants/banners.contants';
import { testimonials } from '@/constants/testimonials.constants';
import CountUpExample from './CountUp';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: { xs: 2, md: 10 }, py: 6 }}>
        {/* Banner Slider */}
        <BannerSlider banners={banners} />

        {/* Offer Strip */}
        <Grid container spacing={2}>
          {offers.map((offer, i) => (
            <Grid size={{ xs: 12, sm: 4 }} key={i}>
              <OfferCard {...offer} />
            </Grid>
          ))}
        </Grid>

        {/* Product Grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="h5" fontWeight="bold">
            Best Selling Sarees
          </Typography>

          <Grid container spacing={3}>
            {sarees.map((saree) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={saree.id}>
                <SareeCard saree={saree} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h4" textAlign="center">
            What Our Customers Say 💬
          </Typography>
          <TestimonialMarquee items={testimonials} />
          <TestimonialMarquee items={testimonials} direction="right" />
        </Box>
        <CountUpExample />
      </Box>
    </Box>
  );
};

export default Dashboard;
