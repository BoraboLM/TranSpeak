import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';

/**
 * Generate a password token and store it in the database
 * @param {*} email 
 * @returns 
 */
export const generatePasswordResetToken = async (email) => {
    const token = uuidv4();
    // Token expires in 5 minutes
    const expires = new Date(new Date().getTime() + 300 * 1000);
    // Check if there is an existing token
    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken){
        await db.PasswordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const passwordResetToken = await db.PasswordResetToken.create({
        data: {
            token,
            email,
            expires,
        }
    });

    return passwordResetToken
}

/**
 * Generate a verification token for account verification and store it in the database
 * @param {*} email 
 * @returns 
 */
export const generateVerificationToken = async (email) => {
    const token = uuidv4();
    // Token expires in 1 hour
    const expires = new Date(new Date().getTime() + 600 * 1000);
    // Check if there is an existing token
    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verificationToken = await db.VerificationToken.create({
        data: {
            token,
            email,
            expires,
        }
    });

    return verificationToken;
}

