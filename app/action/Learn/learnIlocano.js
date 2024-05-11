"use server";
import { db } from "@/lib/db";

export default async function LearnIlocano(){
    const modules = await db.learn.findMany({
        select: {
            id: true,
            language: true,
            title: true,
            description: true,
            topic: true,
            status: true
        }
    })

    return{
        status: 200,
        message: 'Success',
        data: [
            {
                modules: modules
            }
        ]
    }
}