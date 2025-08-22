// PROJECT IMPORTS

import GuestGuard from '@/utils/route-guard/GuestGuard';
import Login from '@/view/authentication/Login';

// ==============================|| LANDING PAGE ||============================== //

const Landing = () => (
  <GuestGuard>
    <Login />
  </GuestGuard>
);

export default Landing;
