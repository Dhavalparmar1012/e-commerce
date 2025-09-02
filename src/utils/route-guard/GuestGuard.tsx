'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Already logged in
    if (session?.user?.role === 'admin') {
      router.replace('/admin');
    } else if (session?.user) {
      router.replace('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading' || session) return null;

  return <>{children}</>;
};

export default GuestGuard;
