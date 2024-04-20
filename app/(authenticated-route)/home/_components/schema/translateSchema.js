import { z } from "zod";

export const translateSchema = z.object({
    source: z.string().min(1,{
        message: "Source Language is required!"
    }),
    target: z.string().min(1,{
        message: "Target Language is required!"
    }),
    input: z.string().min(1,{
        message: "Input is required!"
    })
})