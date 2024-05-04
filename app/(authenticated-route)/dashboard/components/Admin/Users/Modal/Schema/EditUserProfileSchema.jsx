import * as z from "zod";

export const EditProfileSchema = z.object({
    firstName: z.string().min(1, {
        message: "Please enter users first name."
    }),
    lastName: z.string().min(1, {
        message: "Please enter users last name."
    }),
    role: z.string().min(1, {
        message: "Please select user's ROLE"
    }),
    status: z.string().min(1, {
        message: "Please select user's STATUS"
    }),
    nationality: z.string().min(1, {
        message: "Please Enter User's Nationality"
    })
});