import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAuth } from '@ps/server/firebase/config';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      id: 'firebase-email',
      name: 'firebase-email',
      credentials: { token: { type: 'text' } },
      // eslint-disable-next-line
      // @ts-ignore: Type error
      async authorize(credentials) {
        if (!credentials?.token) {
          return null;
        }

        try {
          const verifiedUser = await getAuth().verifyIdToken(credentials.token);
          if (verifiedUser) {
            return { email: verifiedUser.email };
          } else {
            return null;
          }
        } catch (error) {
          throw Error('User not autherized');
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      if (session) {
        const user = await getAuth().getUserByEmail(session.user.email);
        // Inject user info into session
        // Note: Session type is augmented in the 'types/next-auth.d.ts' file
        if (user) {
          const { uid, phoneNumber, photoURL, displayName } = user;
          session.user = {
            uid,
            email: session.user.email,
            photoURL: photoURL,
            displayName,
            phoneNumber,
          };
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
