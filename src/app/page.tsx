import AuthLayout from '@/sections/auth/AuthLayout';
import GuestGuard from '@/utils/route-guard/GuestGuard';
import LoginForm from '@/view/authentication/LoginForm';

// ==============================|| LOGIN ||============================== //

const Landing = () => (
  <GuestGuard>
    <AuthLayout content={<LoginForm />} />
  </GuestGuard>
);

export default Landing;
