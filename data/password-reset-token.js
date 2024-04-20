import { db } from "@/lib/db";

export const getPasswordResetToken = async (token) => {
    try {
        const passwordResetToken = await db.PasswordResetToken.findUnique({
            where: {
                token
            }
        })

        return passwordResetToken;
    } catch {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email) => {
    try {
        const passwordResetToken = await db.PasswordResetToken.findUnique({
            where: {
                email
            }
        })

        return passwordResetToken;
    } catch {
        return null;
    }
}