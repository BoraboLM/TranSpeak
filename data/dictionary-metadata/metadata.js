import { db } from "@/lib/db";

export const OverallMetadata = async () => {
    try{
        const metadata = await db.Dictionary.findMany({})

        return metadata;
    }catch(error){
        console.error(error)
    }
}