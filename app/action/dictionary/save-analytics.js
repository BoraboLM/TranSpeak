'use server';
import { db } from "@/lib/db";

export const saveAnalytics = async (data) => {
    const { word, lang, wordId, userId } = data;
    await db.DictionaryAnalytics.create({
        data: {
            word: word,
            language: lang,
            wordId: wordId,
            userId: userId
        }
    })
    return;
};