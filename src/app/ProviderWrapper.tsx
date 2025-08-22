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
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  </CacheProvider>
);

export default ProviderWrapper;
