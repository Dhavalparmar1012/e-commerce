'use client';
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export type BannerType = {
  img: string;
  title: string;
  offer: string;
  desc: string;
};

const BannerSlider = ({ banners }: { banners: BannerType[] }) => {
  const bannerSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...bannerSettings}>
      {banners.map((banner, i) => (
        <Box key={i} sx={{ position: 'relative' }}>
          {/* Banner Image */}
          <Box
            sx={{
              backgroundImage: `url(${banner.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: { xs: 220, sm: 350, md: 420 },
              borderRadius: 2,
            }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              borderRadius: 2,
              background: 'linear-gradient(to right, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)',
              display: 'flex',
              alignItems: 'center',
              pl: { xs: 2, sm: 6 },
            }}
          >
            {/* Text Content */}
            <Box sx={{ color: 'white', maxWidth: { xs: '80%', sm: '45%' } }}>
              <Typography variant="h4" fontWeight="bold">
                {banner.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#ffeb3b', mt: 1 }}>
                {banner.offer}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {banner.desc}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                  backgroundColor: '#ff5722',
                  '&:hover': { backgroundColor: '#e64a19' },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default BannerSlider;
