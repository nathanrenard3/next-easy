import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    locations: string[];
    superuser: boolean;
  }
  interface Session {
    id: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      country: string;
      locations: string[];
      superuser: boolean;
    } & DefaultSession["user"];
  }
}
