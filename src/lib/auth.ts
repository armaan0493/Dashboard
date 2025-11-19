import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { getUsersCollection, type UserDocument } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email.toLowerCase();
        const users = await getUsersCollection();
        const user: UserDocument | null = await users.findOne({ email });

        if (!user || !user._id) return null;

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name ?? "User",
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as NextAuthUser;
        token.id = (u as NextAuthUser & { id?: string }).id ?? undefined;
        token.name = u.name;
        token.email = u.email;
        token.picture = (u as NextAuthUser & { image?: string | null }).image ?? null;
        return token;
      }

      if (token.email) {
        const users = await getUsersCollection();
        const dbUser: UserDocument | null = await users.findOne({ email: token.email as string });
        if (dbUser) {
          token.name = dbUser.name ?? token.name;
          token.picture = dbUser.image ?? token.picture;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? session.user.id;
        session.user.name = (token.name as string | null) ?? session.user.name;
        session.user.email = (token.email as string) ?? session.user.email;
        session.user.image = (token.picture as string | null) ?? session.user.image;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
