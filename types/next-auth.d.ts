import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      uid: string;
      email: string;
      phoneNumber?: string;
      displayName?: string;
      photoURL?: string;
    };
  }
}
