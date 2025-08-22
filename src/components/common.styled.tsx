import theme from '@/themes/theme';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const HeadlinePink = styled(Box)(() => ({
  height: 2,
  width: 100,
  backgroundColor: theme.palette.primary.main,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));
