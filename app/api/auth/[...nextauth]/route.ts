
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/clients/prismaclient";
import { User } from "@/interfaces";
import { UserService } from "@/services/Userservice";

import {NextApiRequest ,NextApiResponse } from "next"

export const authOptions  : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "59527589965-vk5ofikkjij88ta3f3jrhdvk2lmou90l.apps.googleusercontent.com",
      clientSecret: "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"
    }),
    
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async session({ session, token }) {
    
      // Add custom properties to the session if needed
      return session;
    },
    //@ts-expect-error
    async signIn({ user, account, profile }  : {user : User}) {
     const checkuesr = await UserService.CheckUser(user.email)
     if(checkuesr == null){
        await UserService.Createuser(user.email , user.image , user.name)
     }
     return true; // Customize as needed
    },
  },
}




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}







