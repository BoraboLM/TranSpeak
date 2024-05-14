import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const PhrasebookModules = async () => {
    try {
        const phrasebookData = await db.Phrasebook.findMany({
            where:{
                status: 'ACTIVE'
            }
        })

        revalidatePath("dashboard/learn");
        return phrasebookData;
    } catch (error) {
        console.error(error);
    }
}

export const PangasinanModules = async () => {
    try {
        const pangasinanData = await db.Learn.findMany({
            where:{
                status: 'ACTIVE',
                language: 'PANGASINAN'
            }
        })

        revalidatePath("dashboard/learn");
        return pangasinanData;
    } catch (error) {
        console.error(error);
    }
}

export const IlocanoModules = async () => {
    try {
        const IlocanoData = await db.Learn.findMany({
            where:{
                status: 'ACTIVE',
                language: 'ILOCANO'
            }
        })

        revalidatePath("dashboard/learn");
        return IlocanoData;
    } catch (error) {
        console.error(error);
    }
}