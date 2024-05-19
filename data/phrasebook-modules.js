import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const PhrasebookModules = async () => {
    try {
        const phrasebookData = await db.Phrasebook.findMany({
            orderBy: {
                createdAt: "desc"
            },
        })

        revalidatePath("dashboard/learn");
        return phrasebookData;
    } catch (error) {
        console.error(error);
    }
}

