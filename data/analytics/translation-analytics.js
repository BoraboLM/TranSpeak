import { db } from "@/lib/db";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { revalidatePath } from "next/cache";

export const TranslationCounts = async (month, year, week, overall) => {
    try {
        const languages = ["Pangasinan", "Ilocano", "Filipino", "English"];
        let where = {
            inputLang: {
                in: languages
            },
            outputLang: {
                in: languages
            }
        };

        if (overall) {
        } else if (month && year) {
            const startDate = startOfMonth(new Date(year, month - 1));
            const endDate = endOfMonth(startDate);
            where.createdAt = {
                gte: startDate,
                lte: endDate
            };
        } else if (week) {
            const currentDate = new Date();
            const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
            const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
            where.createdAt = {
                gte: startDate,
                lte: endDate
            };
        }

        const data = await db.Translation.groupBy({
            by: ['inputLang', 'outputLang'],
            _count: {
                id: true
            },
            where,
            orderBy: {
                _count: {
                    id: 'desc'
                }
            }
        });

        revalidatePath('/dashboard')

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
