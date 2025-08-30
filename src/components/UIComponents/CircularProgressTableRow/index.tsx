import { TableCell, TableRow, CircularProgress } from '@mui/material';

const CircularProgressTableRow = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell colSpan={colSpan} sx={{ textAlign: 'center', py: 3 }}>
      <CircularProgress size={24} />
    </TableCell>
  </TableRow>
);

export default CircularProgressTableRow;
