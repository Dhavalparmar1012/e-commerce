// eslint-disable-next-line
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by useSession, getSession and received as a prop on the SessionProvider React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'user';
      token: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    token: string;
  }
}
