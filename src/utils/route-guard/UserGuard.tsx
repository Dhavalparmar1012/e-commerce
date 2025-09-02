'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const UserGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Not logged in: allowed ✅
    if (!session) return;

    // Admin trying to access (user) route
    if (session?.user?.role === 'admin') {
      router.replace('/admin');
    }
  }, [session, status, router]);

  // While loading or redirecting
  if (status === 'loading' || session?.user?.role === 'admin') {
    return null;
  }

  return <>{children}</>;
};

export default UserGuard;
