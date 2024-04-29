"use server";
import * as z from "zod";
import { newPasswordSchema } from "@/components/Forms/schema/NewPasswordSchema";
import { getPasswordResetToken } from "@/data/password-reset-token";
import { getUserEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (data, token) => {
    if(!token){
        return {
            data: [
                {message: "Missing Token!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    const validatedFields = newPasswordSchema.safeParse(data);
    if(!validatedFields.success){
        return {
            data: [
                {message: "Invalid Fields!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetToken(token);

    if(!existingToken){
        return {
            data: [
                {message: "Token does not Exist! Please try again!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    const hasExpires = new Date(existingToken.expires) < new Date();
    if(hasExpires){
        return {
            data: [
                {message: "Token Expired!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    const existingUser = await getUserEmail(existingToken.email);

    if(!existingUser){
        return {
            data: [
                {message: "Account does not Exist!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword
        }
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    });
    
    await db.ActivityLogs.create({
        data: {
            userId: existingUser.id,
            name: existingUser.name,
            action: "Password Reset",
            information: "User updated Password",
            createdAt: new Date(),
        }
    })

    return {
        data: [
            {message: "Password Updated Successfully!"},
            {type: "Success! 🎉"},
            {variant: ""}
        ]
    }
}