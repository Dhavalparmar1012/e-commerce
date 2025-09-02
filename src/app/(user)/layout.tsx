import Footer from '@/layout/UserLayout/Footer/Footer';
import Header from '@/layout/UserLayout/Header/Header';
import UserGuard from '@/utils/route-guard/UserGuard';
import Box from '@mui/material/Box';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserGuard>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </UserGuard>
  );
}
