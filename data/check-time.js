import { db } from "@/lib/db";

export const CheckTime = async ({id}) => {
    try{
        const checkTime = await db.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                updatedAt: true
            }
        })

        return checkTime;
    }catch(error){
        console.error(error)
    }
}