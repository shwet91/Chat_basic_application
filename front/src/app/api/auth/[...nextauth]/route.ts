import NextAuth from "next-auth";
import { authOptions } from "./nextAuthOptions";

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
