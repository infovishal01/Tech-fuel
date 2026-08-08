import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    /**
     * Called after a successful sign-in.
     * Creates the user in MongoDB on their very first Google login.
     */
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // First-time OAuth user — create their profile
            await User.create({
              name: user.name || 'Google User',
              email: user.email,
              password: '', // No password for OAuth users
              role: 'user',
              savedTutorials: [],
              // Store the provider image so we can show their avatar
              image: user.image || '',
            });
          }
        } catch (error) {
          console.error('NEXTAUTH SAVE USER ERROR:', error);
          // Don't block login if DB write fails — still allow them in
        }
      }
      return true;
    },

    /**
     * Enriches the JWT token with database info (role, DB id).
     */
    async jwt({ token, user }) {
      if (user?.email) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: user.email }).select('_id role');
          if (dbUser) {
            token.userId = String(dbUser._id);
            token.role = dbUser.role as string;
          }
        } catch (error) {
          console.error('JWT CALLBACK ERROR:', error);
        }
      }
      return token;
    },

    /**
     * Exposes token data to the client session.
     */
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as typeof session.user & { id?: string; role?: string }).id = token.userId as string;
        (session.user as typeof session.user & { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
