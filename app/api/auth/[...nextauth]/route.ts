import NextAuth, { NextAuthOptions } from "next-auth";

import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import { Blob, FormData } from "formdata-node";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? "3c29f242aabd5a1a1f0c0e20e83288c8",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "hyHcWaXmXJg54HD5fcO3ZXhdVoB689S4",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.jwt = token.jwt as string;
      session.user.nickname = token.name as string;
      session.user.username = "kakao" + token.sub;
      // session.user.image = `${process.env.NEXT_PUBLIC_URL}${session.user.image}`;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`);
        const data = await response.json();
        console.log("dddd", data);
        token.jwt = data.jwt;
        token.id = data.user.id;

        //로그인시 카카오에서 전송된 사진을 서버에 업로드
        if (!data.user.picture && token.picture) {
          // const picture = data.user.picture;
          const pictureUrl = token.picture;
          const imageResponse = await fetch(pictureUrl); //imgUrl token.picture
          const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

          const file = new Blob([imageBuffer], { type: "image/jpg" });
          const form = new FormData();
          form.append("files", file, pictureUrl.substring(pictureUrl.lastIndexOf("/") + 1, pictureUrl.length));
          form.append("ref", "plugin::users-permissions.user");
          form.append("refId", data.user.id);
          form.append("field", "picture");

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            method: "POST",
            body: form,
            headers: {
              Authorization: `Bearer ${data.jwt}`,
            },
          }).then(r => r.json());

          token.picture = res[0].url;
        } else {
          token.picture = `${process.env.NEXT_PUBLIC_URL}${data.user.picture.url}?v=${+new Date()}`;
        }
      }

      //개인정보 수정에서 세션을 업로드시
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!

        console.log("update", session, token);
        token.name = session.name;
        token.picture = `${process.env.NEXT_PUBLIC_URL}${session.image}`; // `${token.picture}?v=${+new Date()}`;
      }

      return token;
    },
  },

  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
