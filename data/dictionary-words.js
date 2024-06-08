import { db } from "@/lib/db";

export const getWordsData = async () =>{
    try {
        const dictionaryList = await db.Dictionary.findMany({
            where: {
                status: "ACTIVE"
            }
        })
        
        return dictionaryList
    } catch (error) {
        return {
            data: [
                {
                    status: 500,
                    message: "Something went wrong!"
                },
            ]
        }
    }
}