import { db } from "@/lib/db";

export const AnalyticWordsCount = async () => {
    try {
        const data = await db.DictionaryAnalytics.groupBy({
            by: ['word', 'language'],
            _count: {
                word: true
            },
            orderBy: {
                _count: {
                    word: 'desc'
                }
            },
        });

        return data;
    } catch (error) {
        console.error(error);
    }
};
