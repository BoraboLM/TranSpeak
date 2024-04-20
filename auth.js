import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import configuration from "@/auth.config";
import { db } from "@/lib/db";

import { getUserId } from "@/data/user";

export const {
    handlers: {GET, POST}, 
    auth,
    signIn,
    signOut,
} = NextAuth({
    // Custom configrations routes for authentication
    pages:{
        signIn: "/auth/sign-in",
        error: "/auth/error",
    },
    events:{
        // This will automatically verify the email of the user if the login method is oauth
        // linkAccount is a built-in method of authjs for linking accounts such as OATH (GOOGLE, FACEBOOK, etc.)
        async linkAccount({ user }){
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }){
            if(account.provider !== "credentials") return true;

            const existingUser = await getUserId(user.id);

            if(!existingUser.emailVerified) return false;

            return true;
        },
        async session({ token, session }){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            if(token.role && session.user){
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({token}){
            if(!token.sub) return null;

            // assigning custom token properties from the database schema
            const existingUser = await getUserId(token.sub);

            if(!existingUser) return null;
            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    secret: process.env.AUTH_SECRET_1,
    session:{ strategy: "jwt"},
    ...configuration,
})