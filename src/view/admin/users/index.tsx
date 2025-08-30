'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import CircularProgressTableRow from '@/components/UIComponents/CircularProgressTableRow';
import { UserData } from '@/services/admin/type';
import { deleteUser, viewUsers } from '@/services/admin/userService';
import { debounce } from '@/utils/debounce';

const UsersInfo = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (search = ''): Promise<void> => {
    setLoading(true);
    try {
      const response = await viewUsers(search);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchUsers(value);
      }, 500),
    [fetchUsers]
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
      const response = await deleteUser(id);
      if (response.success) {
        toast.success('User deleted successfully');
        setUsers((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log('Failed to delete user', error);
      toast.error('Failed to delete user');
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" mb={3}>
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ maxWidth: 400 }}
          />
        </Stack>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>User name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white' }}>Role</TableCell>
                  <TableCell sx={{ color: 'white' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <CircularProgressTableRow colSpan={5} />
                ) : users.length > 0 ? (
                  users.map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{moment(row.createdAt).format('DD/MM/YYYY h:mm A')}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleEdit(row._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography align="center" py={3} color="text.secondary">
                        No users found.
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

export default UsersInfo;
