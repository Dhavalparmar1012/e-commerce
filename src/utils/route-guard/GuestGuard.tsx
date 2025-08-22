'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user) {
        const isAdmin = session.user.role === 'admin';
        console.log(isAdmin, 'isAdmin--Guest');
        console.log(session, 'session--Guest');

        if (isAdmin) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    };

    if (status !== 'loading') {
      fetchData();
    }
    // eslint-disable-next-line
  }, [session, status]);

  return <>{children}</>;
};

export default GuestGuard;
