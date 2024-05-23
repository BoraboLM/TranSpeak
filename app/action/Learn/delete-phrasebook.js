'use server'

import { getUserId } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const DeletePhrasebook = async ( data ) => {
    const { id, userId, userName } = data;
    try {
        const user = await getUserId(userId);
        if(!user) return {
            data: [
                {message: 'This user does not exist!'},
                {type: 'Error'},
                {variant: 'destructive'}
            ]
        }

        if(user.role !== 'ADMIN') return {
            data: [
                {message: 'User not Authorized to Delete Phrasebook!'},
                {type: 'Error'},
                {variant: 'destructive'}
            ]
        }

        await db.Phrasebook.delete({
            where: {
                id: id
            }
        })

        await db.ActivityLogs.create({
        data: {
            userId: user.id,
            action: `Deleted Phrasebook.`,
            name: user.name,
            information: `Admin ${user.name} Deleted a Phrasebook.`,
        }
    })

    revalidatePath('/dashboard/learn/phrasebook')

    return {
            data: [
                {message: 'Phrasebook deleted successfully!'},
                {type: 'Success'},
                {variant: ''}
            ]
        }
    } catch (error) {
        return {
            data: [
                {message: 'Something went wrong! try again later.'},
                {type: 'Error'},
                {variant: 'destructive'}
            ]
        }
    }
}