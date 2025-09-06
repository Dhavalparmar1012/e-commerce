// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import theme from '@/themes/theme';

export const SareeCatalogMainContainer = styled(Box)(() => ({
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: theme.spacing(3),
  boxShadow: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: 'white',
  marginTop: theme.spacing(1.5),
}));

export const CatalogTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: '#1976D2',
}));

export const SareeCatalogContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const SareeCatalogChildContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const ImageChildContainer = styled(Grid)(() => ({
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  gap: theme.spacing(1),
  width: '100%',
}));

export const SareeCatalogButtonContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ProductLoaderContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

export const ProductFormMainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

export const ProductFormContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: '150px',
}));
