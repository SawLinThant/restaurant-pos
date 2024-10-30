import { PrismaAdapter } from "@auth/prisma-adapter";
import { verify } from "argon2";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
import { prisma } from "~/server/db";
import { signInSchema } from "./domain/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      userType: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

const credentialsProvider = CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "credentials",
  async authorize(credentials, req) {
    try {
      const creds = await signInSchema.parseAsync(credentials);
      const user = await prisma.user.findFirst({
        where: { phone: credentials?.phone },
        select: {
          id: true,
          name: true,
          password: true,
          userType: true,
          email:true
        },
      });

      if (!user) {
        return null;
      }

      const isValid = await verify(user.password, creds.password);
      if (!isValid) {
        return null;
      }
      const { password, ...data } = user;
      //console.log(user)
      return data;
    } catch (e) {
      return null;
    }
    // if (
    //   credentials?.password !== "123456" ||
    //   credentials?.email !== "user@gmail.com"
    // ) {
    //   return null;
    // }
    // Add logic here to look up the user from the credentials supplied
    // const user = {
    //   id: "1",
    //   name: "J Smith",
    //   username: "smith",
    //   email: "user@example.com",
    //   role: "user",
    //   address: "somewhere",
    //   phone: "09222222222",
    // };

    // if (user) {
    // Any object returned will be saved in `user` property of the JWT
    //   return user;
    // } else {
    // If you return null then an error will be displayed advising the user to check their details.
    // return null;

    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    // }
  },
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    phone: { label: "phone", type: "phone", placeholder: "09234234" },
    password: { label: "Password", type: "password" },
  },
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    credentialsProvider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages:{
    signIn: "/login"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
    // redirect: async ({ url, baseUrl, ...rest }) => {
    //   console.log(`url=${url}| baseUrl=${baseUrl}`);
    //   console.log(rest);
    //   const u = url.replace(/^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, "");
    //   return `${baseUrl}/${u}`;
    // },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
