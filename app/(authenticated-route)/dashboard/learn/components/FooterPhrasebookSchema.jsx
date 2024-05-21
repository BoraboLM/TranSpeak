import * as z from "zod";

export const FooterPhrasebookFormSchema = z.object({
    language: z.string().min(1, {
        message: "Please enter a Language."
    }),
    title: z.string().min(1, {
        message: 'Please enter a Category'
    }),
    sourceLanguage: z.string().min(1, {
        message: 'ENGLISH is required'
    }),
    english_word: z.string().min(1, {
        message: 'Please enter an English Word'
    }),
    targetLanguage: z.string().min(1, {
        message: 'Please enter a Target Language'
    }),
    target_word: z.string().min(1, {
        message: 'Please enter a Target Word'
    }),
    pronounciation: z.string().min(1, {
        message: 'Please enter a Pronounciation'
    }),
    status: z.enum(['ACTIVE', 'DISABLED']),
})