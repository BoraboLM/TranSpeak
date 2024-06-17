'use server';
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const UpdateDictionaryStatus = async (data) => {
    try {
        const { id, status } = data.newData;
        await db.Dictionary.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        revalidatePath('/dashboard/dictionary')
        return {
            data: [
                {
                    status: 200,
                    message: 'Success'
                }
            ]
        }
    } catch (error) {
        console.error(error)
    }
}