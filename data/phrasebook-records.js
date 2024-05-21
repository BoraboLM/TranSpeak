import { db } from "@/lib/db";

export const HistoryRecords = async () => {
    try {
        const historyData = await db.Phrasebook.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return historyData
    } catch (error) {
        return {
            error: 500,
            message: 'Something went wrong. Please try reloading page.'
        }
    }
}