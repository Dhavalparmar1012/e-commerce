'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const navItems =
    session?.user?.role === 'admin'
      ? [
          { label: 'Admin', href: '/admin' },
          { label: 'Users', href: '/users' },
          { label: 'Catalog', href: '/admin/catalog' },
        ]
      : [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Contact', href: '/contact' },
          { label: 'About', href: '/about' },
        ];

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {session?.user?.role === 'admin' ? 'Admin Panel' : 'User Panel'}
        </Typography>

        <Stack direction="row" spacing={2}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              color={pathname === item.href ? 'secondary' : 'inherit'}
              sx={{ fontWeight: pathname === item.href ? 'bold' : 'normal' }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Box>
          {session ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} href="/">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
