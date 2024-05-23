"use server"
import { db } from "@/lib/db"
import { PhrasebookFormSchema } from "@/app/(authenticated-route)/dashboard/learn/components/PhrasebookFormSchema"
import { userAdmin } from "@/data/user";
import { revalidatePath } from "next/cache";

export const SavePhrasebook = async (data, user) => {
    const validatedFields = PhrasebookFormSchema.safeParse(data);

    if(!validatedFields.success){
        return {
            data: [
                {message: 'Invalid data!'},
                {type: 'Error!'},
                {variant: 'destructive'}
            ]
        }
    }
    const { language, sourceLanguage, targetLanguage, title, english_word, target_word, pronounciation } = data;

    const existingUser = await userAdmin(user);
    if(existingUser.role !== 'ADMIN'){
        return {
            data: [
                {message: 'This user does not have permission'},
                {type: 'Error'},
                {variant: 'destructive'}
            ]
        }
    }

    await db.Phrasebook.create({
        data: {
            userId: existingUser.id,
            sourceLanguage: sourceLanguage,
            targetLanguage: targetLanguage,
            language: language,
            title: title,
            english_word: english_word,
            target_word: target_word,
            pronounciation: pronounciation
        }
    })

    await db.ActivityLogs.create({
        data: {
            userId: existingUser.id,
            action: `Phrasebook created`,
            name: existingUser.name,
            information: `Admin ${existingUser.name} created a phrasebook data.`,
        }
    })
    
    revalidatePath('/dashboard/learn')

    return {
        data: [
            {message: `Phrasebook saved successfully! Enable to view the data in the list.`},
            {type: 'Success'},
            {variant: ''}
        ]
    }
}