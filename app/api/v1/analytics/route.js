import { AnalyticWordsCount } from "@/data/analytics/analytics";

export async function GET(req,res){
    try{
    const url = new URL(req.url)
    const params = new URLSearchParams(url.searchParams)
    const month = params.get('month')
    const year = params.get('year')

    const data = await AnalyticWordsCount(Number(month), Number(year));

    return Response.json({
        status: 200,
        data: data
    })
    }catch(error){
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }));
    }
}