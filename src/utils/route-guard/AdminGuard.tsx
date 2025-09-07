'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Not logged in:
    if (!session) {
      router.replace('/');
      return;
    }

    // User trying to access admin route
    if (session.user.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [session, status, router]);

  // While loading or redirecting
  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminGuard;
