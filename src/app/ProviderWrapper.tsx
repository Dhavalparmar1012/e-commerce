'use client';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/themes/createEmotion';
import { AuthProvider } from './Provider';
import Header from '@/layout/UserLayout/Header/Header';
import Footer from '@/layout/UserLayout/Footer/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const clientSideEmotionCache = createEmotionCache();

type RootLayoutProps = {
  children: ReactNode;
  emotionCache?: EmotionCache;
};

const ProviderWrapper = ({ children, emotionCache = clientSideEmotionCache }: RootLayoutProps) => (
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Container maxWidth="lg">{children}</Container>
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  </CacheProvider>
);

export default ProviderWrapper;
