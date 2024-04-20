"use server";

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { db } from '@/lib/db';

// Form Schema
import { formSchema } from '@/components/Forms/schema/signupSchema';
import { getUserEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const Signup = async (data) => {

    const validatedData = formSchema.safeParse(data);

    if(!validatedData.success){
        return {
            data: [
                {message: 'Invalid data!'},
                {type: 'Error! 🧐'},
                {variant: 'destructive'}
            ]
        }
    }

    const { firstName, lastName, email, password, nationality } = validatedData.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserEmail(email);

    if(existingUser){
        return {
            data: [
                {message: 'Account already exists!'},
                {type: 'Error! 🧐'},
                {variant: 'destructive'}
            ]
        }
    }

    await db.user.create({
        data: {
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            nationality: nationality
        }
    })

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );
    
    return {
        data: [
            {message: 'Account created successfully! \n Please check your email for verification!'},
            {type: 'Success! 🧐'},
            {variant: ''}
        ]
    }
}