import { db } from "@/lib/db";

export const getUserEmail = async (email) => {
    try{
        const user = await db.user.findUnique({
            where: { email }
        })

        return user;
    }catch{
        return null
    }
}


export const getUserId = async (id) => {
    try{
        const user = await db.user.findUnique({ where: {id} });
        
        return user;
    }catch{
        return null
    }
}