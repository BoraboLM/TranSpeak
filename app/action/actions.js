"use server";
import { NextResponse } from 'next/server'

// Sign in with credentials


// Sign in with email(Magic Links)
export const SigninWithEmail = async (data) => {
    const { email } = data;
    console.log("email: ", email)
    if(email){
        return {
            data: [
                {message: "A magic link has been sent to your email. Please check your email to continue"},
                {type: `Success! 🧐 ${email}`},
                {variant: ""}
            ]
        }
    }else{
        return {
            data: [
                {message: "Something went wrong. Please try again later."},
                {type: "Failed! 😱"},
                {variant: "destructive"}
            ]
        }
    }
}


// Sign up with credentials


