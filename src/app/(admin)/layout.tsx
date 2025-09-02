import Footer from '@/layout/UserLayout/Footer/Footer';
import Header from '@/layout/UserLayout/Header/Header';
import AdminGuard from '@/utils/route-guard/AdminGuard';
import Box from '@mui/material/Box';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </AdminGuard>
  );
}
