import { z } from "zod";

export const formSchema = z.object({
    firstName: z.string().min(3, {
        message: "Please enter your first name."
    }),
    lastName: z.string().min(3, {
        message: "Please enter your last name."
    }),
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
    nationality: z.string().min(1,{
        message: "Please select your Nationality."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters."
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
}) 
