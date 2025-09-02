import { Paper, Stack, Avatar, Typography, Box } from '@mui/material';

const TestimonialCard = ({ item }: { item: any }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '300px', md: '420px' },
        m: 2,
        p: 3,
        borderRadius: 3,
        backgroundColor: '#fff',
        flexShrink: 0,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Avatar src={item.image} sx={{ width: 60, height: 60 }} />
        <Typography variant="body2" textAlign="center" fontStyle="italic">
          {item.text}
        </Typography>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            {item.designation}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default TestimonialCard;
