import { db } from "@/lib/db";

export const cityData = async (currentCity) => {
    try {
        const data = await db.Location.findMany({
            where: {
                city: {
                    contains: currentCity,
                    mode: 'insensitive'
                },
            }
        })

        return data
    } catch (error) {
        return [
            console.error(error)
        ]
    }
}