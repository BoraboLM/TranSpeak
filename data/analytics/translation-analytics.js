import { db } from "@/lib/db";

export const TranslationCounts = async () => {
    try {
        const languages = ["Pangasinan", "Ilocano", "Filipino", "English"];
        
        const data = await db.Translation.groupBy({
            by: ['inputLang', 'outputLang'],
            _count: {
                id: true
            },
            where: {
                inputLang: {
                    in: languages
                },
                outputLang: {
                    in: languages
                }
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            }
        });

        return data;
    } catch (error) {
        console.error(error);
    }
};
