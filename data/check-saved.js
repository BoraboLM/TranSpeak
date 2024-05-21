import { db } from "@/lib/db";

export const CheckBookmarkStatus = async (userId) => {
    const id = userId.userId;
    try {
        const savedPhrases = await db.SavedPhrasebook.findMany({
            where: {
                userId: id
            },
            include: {
                phrasebook: true
            }
        })
        
        return savedPhrases
    } catch (error) {
        console.error(error)
    }
}