import { cityData } from "@/data/map-city"

export async function GET(req) {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.searchParams)
    const city = params.get('city')

    const data = await cityData(city)
    return Response.json({ 
        status: 200,
        data: data
    })
}