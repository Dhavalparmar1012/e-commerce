'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Card, CardContent, Typography, Box, Rating } from '@mui/material';
import { reviews } from '@/constants/reviews.constants';

const ProductReviewSlider = () => (
  <Box
    sx={{
      width: '100%',
      maxWidth: 500,
      p: 3,
      borderRadius: 4,
      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
      boxShadow: '0 8px 32px rgba(25,118,210,0.3)',
    }}
  >
    <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3} sx={{ color: 'white' }}>
      What Our Customers Say 💙
    </Typography>

    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500 }}
      loop
      style={{ width: '100%', paddingBottom: '30px' }}
    >
      {reviews.map((item, i) => (
        <SwiperSlide key={i}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            }}
          >
            <Box component="img" src={item.image} alt="saree" sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {item.name}
              </Typography>
              <Rating value={item.rating} readOnly sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                &quot;{item.review}&quot;
              </Typography>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

export default ProductReviewSlider;
