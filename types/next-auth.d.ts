//types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      nickname: string;
      email: string;
      image: string;
    };
    jwt: string;
  }
}
