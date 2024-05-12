import { db } from "@/lib/db";

export const UserActivityLogs = async (id) => {
    try {
        const data = await db.ActivityLogs.findMany({
            select: {
                userId: true,
                action: true,
                information: true,
                createdAt: true,
            },
            where: {
                userId: id
            },
            orderBy: {
                id: "desc"
            }
        })

        return data;
    } catch (error) {
        console.error(error);
    }
}