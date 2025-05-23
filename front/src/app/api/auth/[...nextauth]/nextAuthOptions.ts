import NextAuth, { Account, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { redirect } from "next/navigation";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          email: user.email!,
          name: user.name!,
          oauth_id: account?.providerAccountId,
          provider: account?.provider,
          image: user?.image,
        };
        const { data } = await axios.post(LOGIN_URL, payload);

        user.id = data?.user?.id?.toString();
        user.token = data?.user?.token;
        return true;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("This startted");
          // return redirect(`/auth/error?message=${error.message}`);
          // return redirect(`/dashboard`);
          return true; // ✅ VALID
        }
        return redirect(
          `/auth/error?message=Something went wrong.please try again!`
        );
      }
      // return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      user,
      token,
    }: {
      session: CustomSession;
      user: CustomUser;
      token: JWT;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

// export default NextAuth(authOptions);
