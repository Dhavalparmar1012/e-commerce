'use client';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Paper, Rating, Chip } from '@mui/material';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sarees } from '@/constants/sarees.constant';

const Dashboard = () => {
  const banners = [
    {
      img: 'https://img.freepik.com/free-photo/beautiful-indian-woman-traditional-sari-dress_53876-102709.jpg',
      title: 'Festive Saree Collection',
      offer: 'Flat 40% OFF',
      desc: 'Exclusive Handloom & Silk Sarees',
    },
    {
      img: 'https://img.freepik.com/free-photo/young-beautiful-indian-woman-traditional-sari_1303-17577.jpg',
      title: 'Wedding Special',
      offer: 'Buy 1 Get 1 Free',
      desc: 'On Designer Sarees',
    },
    {
      img: 'https://img.freepik.com/free-photo/indian-female-wearing-traditional-sari-posing_53876-14869.jpg',
      title: 'New Arrivals',
      offer: 'Up to 30% OFF',
      desc: 'Trendy Sarees for Every Occasion',
    },
  ];

  const offers = [
    { title: 'Festive Sale', desc: 'Min 50% OFF', color: '#ff7043' },
    { title: 'Buy 1 Get 1', desc: 'On Selected Sarees', color: '#1976d2' },
    { title: 'Free Delivery', desc: 'On Orders Above ₹999', color: '#388e3c' },
  ];

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
    <Box sx={{ p: 2 }}>
      {/* Banner Slider */}
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

      {/* Offer Strip */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {offers.map((offer, i) => (
          <Grid size={{ xs: 12, sm: 4 }} key={i}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: 'center',
                color: 'white',
                background: offer.color,
              }}
              elevation={3}
            >
              <Typography variant="h5" fontWeight="bold">
                {offer.title}
              </Typography>
              <Typography>{offer.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Product Grid */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
        Best Selling Sarees
      </Typography>
      {/* <Grid container spacing={3}>
        {sarees.map((saree) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={saree.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6, transform: 'scale(1.03)' },
              }}
            >
              <CardMedia component="img" height="250" image={saree.img} />
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  {saree.name}
                </Typography>
                <Typography color="text.secondary">₹{saree.price}</Typography>
                <Typography sx={{ color: 'green', fontWeight: 'bold' }}>{saree.discount}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={3}>
        {sarees.map((saree) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={saree.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                transition: '0.3s',
                '&:hover': { boxShadow: 6, transform: 'scale(1.02)' },
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                height="250"
                image={saree.img}
                alt={saree.name}
                sx={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />

              {/* Product Details */}
              <CardContent>
                <Typography variant="body1" fontWeight="bold" noWrap>
                  {saree.name}
                </Typography>

                {/* Price + Discount */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{saree.price}
                  </Typography>
                  <Typography variant="body2" color="green" fontWeight="bold">
                    {saree.discount}
                  </Typography>
                </Box>

                {/* Rating + Reviews */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Rating value={saree.rating} precision={0.5} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    ({saree.reviews})
                  </Typography>
                </Box>

                {/* Free Delivery */}
                {saree.freeDelivery && <Chip label="Free Delivery" size="small" color="success" sx={{ mt: 1, fontSize: '0.75rem' }} />}
              </CardContent>

              {/* Actions */}
              {/* <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Buy Now
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
