import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

// PROJECT IMPORTS
import { authOptions } from '@/utils/route-guard/authOptions';
import Login from '@/view/authentication/Login';

// ================================|| LOGIN ||================================ //

const Landing = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return <Login />;
};

export default Landing;
