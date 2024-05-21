'use server';
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/data/user";

export const UpdatePhrasebook = async (_data, userId, userName) => {
    const { id, language, title, sourceLanguage, english_word, targetLanguage, target_word, pronounciation, status } = _data;

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
                {message: 'User not Authorized to Update Phrasebook!'},
                {type: 'Error'},
                {variant: 'destructive'}
            ]
        }

        await db.Phrasebook.update({
            where: {
                id: id
            },
            data: {
                language: language,
                title: title,
                sourceLanguage: sourceLanguage,
                english_word: english_word,
                targetLanguage: targetLanguage,
                target_word: target_word,
                pronounciation: pronounciation,
                status: status
            }
        })

        await db.ActivityLogs.create({
        data: {
            userId: userId,
            action: `Updated Phrasebook with id ${id}.`,
            name: userName,
            information: `Admin ${userName} updated a Phrasebook.`,
        }
    })

        revalidatePath('/dashboard/learn');
        return {
            data: [
                {message: `Phrasebook updated successfully!`},
                {type: 'Success! '},
                {variant: ''}
            ]
        }
    } catch (error) {
        return {
            data: [
                    {message: `Something went wrong! try again later.`},
                    {type: 'Error: 500 '},
                    {variant: 'destructive'}
                ]
        }
    }
}