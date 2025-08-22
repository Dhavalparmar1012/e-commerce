import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '@/lib/db';
import { NextAuthOptions } from 'next-auth';
import User from '@/models/User.model';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },

      async authorize(credentials) {
        // Check if credentials are provided and valid
        if (!credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
          throw new Error('Invalid credentials');
        }

        // Destructure credentials
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null; // User not found
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null; // Password does not match
          }

          const token = user.generateAuthToken();
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            token,
          };
          return user; // Successful login, return user object
        } catch (error) {
          console.error('Error during authorization: ', error);
          throw new Error('Authorization error');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      // First login: add user details to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token; // custom JWT from schema
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'user';
        session.user.token = token.token as string;
      }
      return session;
    },
  },
};
