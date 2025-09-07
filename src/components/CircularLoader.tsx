import CircularProgress from '@mui/material/CircularProgress';
import { StyledBackdrop } from './common.styled';

const CircularLoader = ({ isProgress }: { isProgress: boolean }) => (
  <StyledBackdrop open={isProgress}>
    <CircularProgress color="primary" />
  </StyledBackdrop>
);

export default CircularLoader;
