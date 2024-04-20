import z from "zod";

export const newPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6,{
        message: "Password must be at least 6 characters.",
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
}) 