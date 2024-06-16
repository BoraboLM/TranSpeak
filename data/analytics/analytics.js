import { db } from "@/lib/db";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isValid } from 'date-fns';
import { revalidatePath } from "next/cache";

export const AnalyticWordsCount = async (selectedMonth, selectedYear) => {
    try {
        if (selectedMonth < 1 || selectedMonth > 12) {
            throw new Error("Selected month must be between 1 and 12");
        }

        const selectedDate = new Date(selectedYear, selectedMonth - 1, 1);
        if (!isValid(selectedDate)) {
            throw new Error("Invalid selected date");
        }

        const startOfSelectedMonth = startOfMonth(selectedDate);
        const endOfSelectedMonth = endOfMonth(selectedDate);
        if (isNaN(startOfSelectedMonth.getTime()) || isNaN(endOfSelectedMonth.getTime())) {
            throw new Error("Invalid start or end of selected month date")
        }

        const monthlyData = await db.DictionaryAnalytics.groupBy({
            by: ['word', 'language'],
            where: {
                createdAt: {
                    gte: startOfSelectedMonth,
                    lte: endOfSelectedMonth
                }
            },
            _count: {
                word: true
            },
            orderBy: {
                _count: {
                    word: 'desc'
                }
            },
        });

        revalidatePath('/dashboard')

        return monthlyData;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const OverallAnalytics = async () => {
    try {
        const overallData = await db.DictionaryAnalytics.groupBy({
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

        revalidatePath('/dashboard')

        return overallData;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const WeeklyAnalytics = async () => {
    try {
        const currentDate = new Date();
        if (isNaN(currentDate.getTime())) {
            throw new Error("Invalid current date");
        }

        const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
        const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
        if (isNaN(startOfCurrentWeek.getTime()) || isNaN(endOfCurrentWeek.getTime())) {
            throw new Error("Invalid start or end of current week date");
        }

        const weeklyData = await db.DictionaryAnalytics.groupBy({
            by: ['word', 'language'],
            where: {
                createdAt: {
                    gte: startOfCurrentWeek,
                    lte: endOfCurrentWeek
                }
            },
            _count: {
                word: true
            },
            orderBy: {
                _count: {
                    word: 'desc'
                }
            },
        });

        revalidatePath('/dashboard')

        return weeklyData;
    } catch (error) {
        console.error(error);
        return [];
    }
};
