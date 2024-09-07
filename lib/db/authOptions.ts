import prisma from "@/lib/db/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";

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
          include: {
            locations: {
              select: {
                company: true,
              },
            },
          },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
          if (!user.emailVerified) {
            throw new Error("Email not confirmed");
          }

          if (!user.locations[0].company.stripeCustomerId) {
            const stripeCustomer = await stripe.customers.create({
              email,
              name: `${user.firstName} ${user.lastName}`,
            });

            await prisma.company.update({
              where: {
                id: user.locations[0].company.id,
              },
              data: {
                stripeCustomerId: stripeCustomer.id,
              },
            });
          }

          const locations = await prisma.location.findMany({
            where: {
              users: {
                some: {
                  id: user.id,
                },
              },
            },
          });

          const locationIds = locations.map((location) => location.id);

          cookies().set("current-location", locationIds[0], {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          cookies().set("company-id", user.locations[0].company.id, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            country: user.country,
            locations: locationIds,
            superuser: user.superuser,
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
        token.country = user.country;
        token.locations = user.locations;
        token.superuser = user.superuser;
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
          country: token.country as string,
          locations: token.locations as string[],
          superuser: token.superuser as boolean,
        };
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
};
