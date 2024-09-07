import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }
  interface Session {
    id: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    } & DefaultSession["user"];
  }
}
