'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const { data: session } = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    signOut({
      callbackUrl: '/', // Redirect to home page after logout
    });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box onClick={toggleDrawer} sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }}>
        <Link href={'/'}>{process.env.NEXT_PUBLIC_COMPANY_NAME}</Link>
      </Typography>

      <Divider />
      <List>
        <ListItem
          component="button"
          sx={{
            backgroundColor: 'white',
            borderBottom: 'white',
          }}
        >
          <ListItemText
            primary="Home"
            sx={{
              color: 'blue',
              borderBottom: '1px solid black',
              pb: 1,
            }}
          />
        </ListItem>
        <ListItem
          component="button"
          sx={{
            backgroundColor: 'white',
            borderBottom: 'white',
          }}
        >
          <ListItemText
            primary="Contact"
            sx={{
              color: 'blue',
              borderBottom: '1px solid black',
              pb: 1,
            }}
          />
        </ListItem>
        <ListItem
          component="button"
          sx={{
            backgroundColor: 'white',
            borderBottom: 'white',
          }}
        >
          <ListItemText
            primary="Login"
            sx={{
              color: 'blue',
              borderBottom: '1px solid black',
              pb: 1,
            }}
          />
        </ListItem>
        <ListItem
          component="button"
          sx={{
            backgroundColor: 'white',
            borderBottom: 'white',
          }}
        >
          <ListItemText
            primary="Register"
            sx={{
              color: 'blue',
              borderBottom: '1px solid black',
              pb: 1,
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }}>
          <Link href={'/'}>{process.env.NEXT_PUBLIC_COMPANY_NAME}</Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ display: { sm: 'block', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Contact</Button>
            <Link href="/perfume">
              <Button color="inherit">Perfume</Button>
            </Link>
            {session ? (
              <>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/">
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </>
        )}
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;
