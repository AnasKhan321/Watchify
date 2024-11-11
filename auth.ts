
import NextAuth, { Account, Profile, User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { UserService } from "./services/Userservice"
import { AdapterUser } from "next-auth/adapters"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google  ],
  callbacks: {
    async signIn({ user, account, profile }  : 
        {
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile | null;
          }) {
      // Customize sign-in logic here
      const exsitsuser = await UserService.CheckUser(user.email as string)
      console.log(user)
      console.log(exsitsuser)
      if(!exsitsuser){
        if(user.email && user.name && user.image){
            const newuser = await  UserService.Createuser(user.email  , user.image  , user.name )
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Control redirect behavior
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({ session, user, token }) {
      // Customize session data here
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  
})