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
});