import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
  /* config options here */
};

export default nextConfig;
