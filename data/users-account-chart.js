import { db } from "@/lib/db";

export const UserAccountChart = async () => {
    try{
        const users = await db.User.findMany({
            select: {
                createdAt: true,
            }
        })

        const months = [
            { name: 'January', users: 0 },
            { name: 'February', users: 0 },
            { name: 'March', users: 0 },
            { name: 'April', users: 0 },
            { name: 'May', users: 0 },
            { name: 'June', users: 0 },
            { name: 'July', users: 0 },
            { name: 'August', users: 0 },
            { name: 'September', users: 0 },
            { name: 'October', users: 0 },
            { name: 'November', users: 0 },
            { name: 'December', users: 0 },
        ];

        for (const user of users) {
            const month = new Date(user.createdAt).getMonth();
            months[month].users++;
        }

        return months;
    }catch(error){
        console.error(error);
    }
}