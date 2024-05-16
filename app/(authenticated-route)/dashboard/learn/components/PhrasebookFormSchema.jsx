import z from 'zod';

export const PhrasebookFormSchema = z.object({
    sourceLanguage: z.string().min(1, "Please select a source language"),
    targetLanguage: z.string().min(1, "Please select a target language"),
    language: z.string().min(1, "Please select a language"),
    title: z.string().min(1, "Please enter or select Category"),
    english_word: z.string().min(3, "Please enter an English word"),
    target_word: z.string().min(3, "Please enter a target word"),
    pronounciation: z.string().min(1, "Please enter the pronounciation").max(60, "Pronounciation should not exceed 60 characters"),
});