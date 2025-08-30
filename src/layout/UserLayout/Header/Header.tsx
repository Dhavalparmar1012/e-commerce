// src\layout\UserLayout\Header\Header.tsx
'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button, { ButtonProps } from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

// Corrected StyledButton with type annotation for ButtonProps
const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  position: 'relative',
  textTransform: 'none',
  fontWeight: 600,
  color: 'white',
  padding: theme.spacing(1, 2),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: 'white',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom left',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
  '&.active': {
    color: 'white',
    fontWeight: 700,
    '&::after': {
      transform: 'scaleX(1)',
    },
  },
}));

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const navItems =
    session?.user?.role === 'admin'
      ? [
          { label: 'Dashboard', href: '/admin' },
          { label: 'Order', href: '/order' },
          { label: 'Catalog', href: '/admin/catalog' },
          { label: 'User', href: '/admin/users' },
        ]
      : [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Contact', href: '/contact' },
          { label: 'About', href: '/about' },
        ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#1976d2' }}>
        {session?.user?.role === 'admin' ? 'Admin Panel' : 'Saree Emporium'}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                textAlign: 'center',
                backgroundColor: pathname === item.href ? 'action.hover' : 'inherit',
                color: pathname === item.href ? '#1976d2' : 'inherit',
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={session ? handleLogout : undefined}
            component={session ? 'button' : Link}
            href={session ? undefined : '/'}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={session ? 'Logout' : 'Login'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'white',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            }}
          >
            {session?.user?.role === 'admin' ? 'Admin Panel' : 'Saree Emporium'}
          </Typography>
        </Box>
        <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {navItems.map((item) => (
            <StyledButton key={item.href} component={Link} href={item.href} className={pathname === item.href ? 'active' : ''}>
              {item.label}
            </StyledButton>
          ))}
        </Stack>
        <Box sx={{ ml: 3, display: { xs: 'none', sm: 'block' } }}>
          {session ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'white',
                borderColor: 'white',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              href="/"
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'white',
                borderColor: 'white',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </StyledAppBar>
  );
};
export default Header;
