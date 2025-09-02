import { Card, CardMedia, CardContent, Typography, Box, Rating, Chip } from '@mui/material';

const SareeCard = ({ saree }: { saree: any }) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: 2,
      transition: '0.3s',
      '&:hover': { boxShadow: 6, transform: 'scale(1.02)' },
    }}
  >
    <CardMedia
      component="img"
      height="250"
      image={saree.img}
      alt={saree.name}
      sx={{ objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
    />
    <CardContent>
      <Typography variant="body1" fontWeight="bold" noWrap>
        {saree.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          ₹{saree.price}
        </Typography>
        <Typography variant="body2" color="green" fontWeight="bold">
          {saree.discount}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Rating value={saree.rating} precision={0.5} size="small" readOnly />
        <Typography variant="body2" color="text.secondary">
          ({saree.reviews})
        </Typography>
      </Box>
      {saree.freeDelivery && <Chip label="Free Delivery" size="small" color="success" sx={{ mt: 1, fontSize: '0.75rem' }} />}
    </CardContent>
  </Card>
);

export default SareeCard;
