"use server";

import { db } from "@/lib/db";
import { getUserEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token) => {
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken){
        return { error: "Token does not exist!"};
    }

    const tokenExpired = new Date(existingToken.expires) < new Date();

    if(tokenExpired){
        // await db.verificationToken.delete({
        //     where: { id: existingToken.id }
        // })
        return { error: "Token has expired! Please Sign again to send a new verification email"};
    }

    const existingUser = await getUserEmail(existingToken.email);


    if(!existingUser){
        return { error: "email does not exist!"};
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Email Verified" };
}