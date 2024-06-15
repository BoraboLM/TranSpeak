"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
const NLPCloudClient = require('nlpcloud');

export const Translate = async (data, textInput) => {
    const { source, target } = data;
    const input = textInput;
    const session = await auth();

    /**
     * @var {string} sourceLang
     * 
     * The `sourceLang` variable holds the language code of the selected source language.
     * This language code is validated before being assigned to `sourceLang`.
     */
    let sourceLang = '';

    /**
     * @var {string} targetLang
     * The `targetLang` variable holds the language code of the selected target language.
     * This language code is validated before being assigned to `targetLang`.
     */
    let targetLang = '';

    // Assigning the correct Language Code based on the selected Language
    if (source === 'English') {
        sourceLang = 'eng_Latn';
    } else {
        sourceLang = 'tgl_Latn';
    }

    // Assigning the correct target Language Code based on the selected Language
    if (target === 'Pangasinan') {
        targetLang = 'pag_Latn';
    } else if (target === 'Ilocano') {
        targetLang = 'ilo_Latn';
    } else if (target === 'Filipino') {
        targetLang = 'tgl_Latn';
    } else if (target === 'English') {
        targetLang = 'eng_Latn';
    } else {
        targetLang = 'tgl_Latn';
    }

    const match = await db.Translation.findFirst({
        where: {
            input: input,
            inputLang: source,
            outputLang: target
        }
    });

    if (match) {
        await db.ActivityLogs.create({
            data: {
                userId: session.user.id,
                name: session.user.name,
                action: 'Translation',
                information: `Translation from ${source} - ${sourceLang} to ${target} - ${targetLang}`,
                createdAt: new Date()
            }
        });

        return {
            translation: {
                user_input: input,
                translation_text: match.output,
                target: target
            }
        };
    }

    // Translation API
    const apiKey = process.env.TRANSLATION_API_KEY;
    const apiModel = process.env.TRANSLATION_API_MODEL;
    const client = new NLPCloudClient({ model: apiModel, token: apiKey });

    let translatedText = '';
    await client.translation({
        text: input,
        source: sourceLang,
        target: targetLang
    }).then(function (response) {
        translatedText = response.data.translation_text;
    })
    .catch(function (err) {
        console.error(err.response.status);
    });

    await db.translation.create({
        data: {
            userId: session.user.id,
            input: input,
            output: translatedText,
            inputLang: source,
            outputLang: target,
        }
    });

    await db.ActivityLogs.create({
        data: {
            userId: session.user.id,
            name: session.user.name,
            action: 'Translation',
            information: `Translation from ${source} - ${sourceLang} to ${target} - ${targetLang}`,
            createdAt: new Date()
        }
    });

    revalidatePath('/settings');
    
    return {
        translation: {
            user_input: input,
            translation_text: translatedText,
            target: target
        }
    };
};
