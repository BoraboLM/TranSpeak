"use server"
import { db } from "@/lib/db"

export default async function LearnPangasinan(){
    const data = await db.learn.findMany({
        where: {
            language: 'PANGASINAN'
        },
    select: {
        id: true,
        language: true,
        title: true,
        description: true,
        topic: true,
        status: true
    }
})

    return {
        status: 200,
        message: 'Success',
        data: {
                module: data
            },
    }
}
