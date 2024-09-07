import prisma from "@/lib/db/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

const { NEXTAUTH_SECRET } = process.env;

if (!NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set");
}

export const authOptions: AuthOptions = {
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
          if (!user.emailVerified) {
            throw new Error("Email not confirmed");
          }

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
          };
        } else {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  jwt: {
    secret: NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          phone: token.phone as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
};
