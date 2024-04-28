import { db } from "@/lib/db";

export const ActivityLogs = async () => {
    try {
        const activityLogs = await db.activityLogs.findMany({
            orderBy: {
                id: "desc"
            }
        });
        
        return activityLogs;
    } catch (error) {
        return error
    }
}