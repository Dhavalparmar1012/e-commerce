// MATERIAL - UI
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// PROJECT IMPORTS
import theme from '@/themes/theme';

export const FooterPageLink = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  gap: theme.spacing(0.5),
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}));

export const FooterPageAddress = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  gap: theme.spacing(0.5),
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}));
