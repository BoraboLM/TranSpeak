'use server';

import { db } from "@/lib/db";

export const SaveAudio = async ({ data }) => {
    try {
        const { userId, baseFilename, wordFil, wordEng, wordIlo, wordPang, category_letter, baseFil, baseEng, baseIlo, basePang } = data;
        if (!userId || !baseFilename || !wordFil || !wordEng || !wordIlo || !wordPang || !category_letter || !baseFil || !baseEng || !baseIlo || !basePang) {
            return {
                data: [
                    {
                        status: 500,
                        message: 'All fields are required! 🚫'
                    }
                ]
            }
        }

        const checkBaseFilename = await db.Dictionary.findFirst({
            where: {
                baseFilename: baseFilename
            }
        })

        if (checkBaseFilename) {
            return {
                data: [
                    {
                        status: 500,
                        message: 'Base Filename already exists! 🚫'
                    }
                ]
            }
        }

        const dataToDb = await db.Dictionary.create({
            data: {
                userId: userId,
                baseFilename: baseFilename,
                wordFil: wordFil,
                wordEng: wordEng,
                wordIlo: wordIlo,
                wordPang: wordPang,
                category_letter: category_letter,
                baseFil: baseFil,
                baseEng: baseEng,
                baseIlo: baseIlo,
                basePang: basePang
            }
        })
        
        if(!dataToDb){
            return {
                data: [
                    {
                        status: 500,
                        message: 'Error saving metadata. Please try again! 🚫bobo'
                    }
                ]
            }
        }

        return {
            data: [
                {
                    status: 200,
                    message: 'Audio Uploaded! 🎉'
                }
            ]
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}