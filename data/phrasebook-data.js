import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const PhrasebookData = async () => {
    try{
        const phrasebookData = await db.Phrasebook.findMany({});

        revalidatePath("learn");
        return phrasebookData;
    }catch(error){
        console.error(error);
    }
}

export const PangasinanData = async () => {
    try{
        const PangasinanData = await db.Phrasebook.findMany({
            where: {
                language: "PANGASINAN",
                status: "ACTIVE"
            }
        });

        revalidatePath("learn");
        return PangasinanData;
    }catch(error){
        console.error(error);
    }
}

export const IlocanoData = async () => {
    try{
        const IlocanoData = await db.Phrasebook.findMany({
            where: {
                language: "ILOCANO",
                status: "ACTIVE"
            }
        });

        revalidatePath("learn");
        return IlocanoData;
    }catch(error){
        console.error(error);
    }
}