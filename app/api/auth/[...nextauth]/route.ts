import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ROLES, type Role } from "@/lib/auth/roles";

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const email = credentials?.email;
        const password = credentials?.password;

        if (email === "admin@test.com" && password === "admin123") {
          return {
            id: "1",
            email: "admin@test.com",
            name: "Admin",
            role: ROLES.ADMIN,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
        token.sub = (user as User).id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role ?? ROLES.VIEWER;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };