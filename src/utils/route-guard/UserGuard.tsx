'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  console.log(session, 'session');

  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role === 'admin') {
      // Redirect to the home page if not admin
      router.push('/admin');
    }
  }, [session, status, router]);

  // Render the children (protected page) if the user is admin
  if (session?.user?.role !== 'admin') {
    return <>{children}</>;
  }

  return null;
};

export default UserGuard;
