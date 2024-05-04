import { db } from "@/lib/db";

export const UsersData = async () => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                role: "USER"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                nationality: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                id: "desc"
            }
        });
        
        return UsersData;
    } catch (error) {
        return error
    }
}