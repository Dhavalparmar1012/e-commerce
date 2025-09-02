import { Paper, Typography } from '@mui/material';

const OfferCard = ({ title, desc, color }: { title: string; desc: string; color: string }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 2,
      textAlign: 'center',
      color: 'white',
      background: color,
    }}
    elevation={3}
  >
    <Typography variant="h5" fontWeight="bold">
      {title}
    </Typography>
    <Typography>{desc}</Typography>
  </Paper>
);

export default OfferCard;
