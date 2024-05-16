"use server";
import { db } from "@/lib/db";

export const BookmarkPhrasebook = async (userId, phraseId) => {
    try {
        const savePhrasebook = await db.savePhrasebook.create({
            data: {
                userId: userId,
                phraseId: phraseId
            }
        })
        return savePhrasebook;
    } catch (error) {
        console.error(error);
    }
}