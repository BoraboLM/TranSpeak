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

export const userAdmin = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id,
                role: 'ADMIN'
            }
        })

        return user;
    } catch (error) {
        return {
            data: [
                {message: 'This user does not exist!'},
                {type: 'Error'},
                {variant: 'destructive'}
            ]
        }
    }
}