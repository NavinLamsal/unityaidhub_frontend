// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     }),
// CredentialsProvider({
//   // The name to display on the sign in form (e.g. "Sign in with...")
//   name: "Unity Aid Hub",
//   async authorize(credentials, req) {
//     // Add logic here to look up the user from the credentials supplied

//     const user = {
//       id: "1",
//       name: "Test User",
//       email: "user@unityaidhub.com",
//       role: "USER",
//     };

//     if (user) {
//       // Any object returned will be saved in `user` property of the JWT
//       return user;
//     } else {
//       // If you return null then an error will be displayed advising the user to check their details.
//       return null;
//     }
//   },
// }),
//   ],

//   secret: process.env.AUTH_SECRET,

// });

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
      const data = await res.json();
      // console.log("response" ,res);
      if(data){
        return data;
      }else{
        return null;
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
     
      console.log(token);
      return {...token , ...user};
    },
    session: async ({ session, token }) => {
      // session.accessToken = token.accessToken
  
      return session
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
