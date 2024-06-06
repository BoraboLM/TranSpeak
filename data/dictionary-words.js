import { db } from "@/lib/db";

export const getWordsData = async = () =>{
    try {
        
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