"use server";

import { resetSchema } from "@/components/Forms/schema/resetSchema";
import { getUserEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { db } from "@/lib/db";

export const resetPassword = async (data) => {
    const validatedFields = resetSchema.safeParse(data);

    if(!validatedFields.success) {
        return {
            data: [
                {message: "Invalid data!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserEmail(email);

    if(!existingUser) {
        return {
            data: [
                {message: "Account does not exist!"},
                {type: "Error! 🧐"},
                {variant: "destructive"}
            ]
        }
    }

    // TODO HERE
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    await db.ActivityLogs.create({
        data: {
            userId: existingUser.id,
            name: existingUser.name,
            action: "Password Reset Request",
            information: `User requested a password reset link - ${existingUser.email}`,
            createdAt: new Date(),
        }
    })

    return {
        data: [
            {message: `Password reset link sent to your email! ${email}`},
            {type: "Success! 🎉"},
            {variant: ""}
        ]
    }
}
