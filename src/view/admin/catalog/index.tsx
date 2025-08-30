'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import CircularProgressTableRow from '@/components/UIComponents/CircularProgressTableRow';
import { ViewSareeCatalogData } from '@/services/admin/saree-catalog/type';
import { deleteCatalog, viewCatalog } from '@/services/admin/saree-catalog/sareeCatalog';
import { debounce } from '@/utils/debounce';

const CatalogPage = () => {
  const router = useRouter();

  const [catalogs, setCatalogs] = useState<ViewSareeCatalogData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCatalogs = useCallback(async (search = ''): Promise<void> => {
    setLoading(true);
    try {
      const response = await viewCatalog(search);
      setCatalogs(response.data);
    } catch (error) {
      console.error('Failed to fetch catalogs:', error);
      toast.error('Failed to fetch catalogs');
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchCatalogs(value);
      }, 500),
    [fetchCatalogs]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/admin/catalog/${id}`);
    },
    [router]
  );

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await deleteCatalog(id);
      if (response.success) {
        toast.success('Catalog deleted successfully');
        setCatalogs((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error('Delete catalog failed:', error);
      toast.error('Failed to delete catalog');
    }
  }, []);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mb={3}>
          <TextField
            label="Search Catalog"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ maxWidth: 400 }}
          />
          <Button variant="contained" color="primary" onClick={() => router.push('/admin/catalog/add')}>
            Add Catalog
          </Button>
        </Stack>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Brand Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white' }}>Description</TableCell>
                  <TableCell sx={{ color: 'white' }}>Price (₹)</TableCell>
                  <TableCell sx={{ color: 'white' }}>Discount Price (₹)</TableCell>
                  <TableCell sx={{ color: 'white' }}>Image</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <CircularProgressTableRow colSpan={7} />
                ) : catalogs.length > 0 ? (
                  catalogs.map((item) => (
                    <TableRow key={item._id} hover>
                      <TableCell>{item.brandName}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell>₹{item.discountPrice}</TableCell>
                      <TableCell>
                        <Box
                          component="img"
                          src={item.imageUrl || '/placeholder.jpg'}
                          alt={item.title}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleEdit(item._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography align="center" py={3} color="text.secondary">
                        No catalogs found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default CatalogPage;
