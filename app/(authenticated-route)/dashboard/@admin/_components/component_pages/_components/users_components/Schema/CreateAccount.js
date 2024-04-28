import * as z from "zod";

export const CreateAccount = z.object({
    firstName: z.string().min(3, {
        message: "Please enter users first name."
    }),
    lastName: z.string().min(3, {
        message: "Please enter users last name."
    }),
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
    nationality: z.string().min(1,{
        message: "Please enter a user's Nationality"
    })
});