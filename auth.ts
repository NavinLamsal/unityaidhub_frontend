import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";


const credentialsConfig = CredentialsProvider({
  name: "Unity Aid Hub",

  async authorize(credentials, req) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });
      console.log("response",res)
      if(res.ok){
        const data = await res.json();
        if(data){
          return {...data, accessToken: data.accessToken , email: credentials.email};
        }else{
          return null;
        }
      }
      else{
        throw new Error("credential not found");
      }
    } catch (error) {
      console.error("Error in credentials provider:", error);
      return null;
    }
  },
});

const config = {
  providers: [Google, Facebook, credentialsConfig],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if(token.email){
        session.email = token.email;
      }
      return session;
    },
  },
  
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
