import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const PangasinanModuleCount = async () => {
    try{
        const modulePangasinanCount = await db.Learn.findMany({
            where: {
                language: "PANGASINAN",
                status: "ACTIVE"
            }
        })

        revalidatePath('/learn')
        return modulePangasinanCount.length
    }catch(error){
        console.error(error)
    }
}

export const IlocanoModuleCount = async () => {
    try{
        const modulePangasinanCount = await db.Learn.findMany({
            where: {
                language: "ILOCANO",
                status: "ACTIVE"
            }
        })

        revalidatePath('/learn')
        return modulePangasinanCount.length
    }catch(error){
        console.error(error)
    }
}

export const phrasebookModuleCount = async () => {
    try{
        const modulePhrasebookCount = await db.Phrasebook.findMany({
            where: {
                status: "ACTIVE"
            }
        })

        revalidatePath('/learn')
        return modulePhrasebookCount.length
    }catch(error){
        console.error(error)
    }
}