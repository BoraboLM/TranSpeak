"use server";

import { loginSchema } from "@/components/Forms/schema/loginSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const Signin = async ( prevState, formData) =>{
    const { email, password} = Object.fromEntries(formData);
    const validatedFields = loginSchema.safeParse({email, password});

    if (!validatedFields.success) {
        return {error: "Invalid email or password"}
    }

    const existingUser = await getUserEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Invalid Credentials! 😱😱"}
    }

    // Uncomment the following code if the status field is added to the user model
    if(existingUser.status === 'DISABLED'){
        return {error: "Account is disabled! Contact support for more information.🚫🚫"}
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(existingUser.email, verificationToken.token);

        return {success: "Confirmation email sent! Please check your email to verify your account.✅✅"}
    }
    
    try {
        await signIn("credentials", {
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid Credentials 😱😱"}
                default:
                    return {error: "Something went wrong, please try again 😉😉"}
            }
        }
        throw error;
    }
};