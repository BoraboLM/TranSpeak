"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const Translate = async (data, textInput) => {
    const { source, target } = data;
    const input = textInput;
    const session = await auth();

    // if(!input) return null;

    // return {
    //     translation: `this is a translation input: ${input} from ${source} to ${target}.`,
    //     source: source,
    //     target: target,
    //     input: input
    // }

        await db.translation.create({
            data: {
                userId: session.user.id,
                input: input,
                output: input + ' ' + target,
                inputLang: source,
                outputLang: target,
            }
        })

        await db.ActivityLogs.create({
            data: {
                userId: session.user.id,
                name: session.user.name,
                action: 'Translation',
                information: `Translation from ${source} to ${target}`,
                createdAt: new Date()
            }
        })

        revalidatePath('/settings');

    // Mockup for Translation API
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!input) {
                resolve(null);
            } else {
                const translationObj = {
                    translation: ` ${input}.`,
                    source: source,
                    target: target,
                    input: input
                };

                resolve(translationObj);
            }
        }, 3000);
    });
}