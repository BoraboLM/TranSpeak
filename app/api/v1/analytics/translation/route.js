import { TranslationCounts } from "@/data/analytics/translation-analytics";

export async function GET(req, res) {
    try {
        const url = new URL(req.url);
        const params = new URLSearchParams(url.searchParams);
        const month = params.get('month');
        const year = params.get('year');
        const week = params.get('week');
        const overall = params.get('overall');
        
        const data = await TranslationCounts(Number(month), Number(year), week === 'true', overall === 'true');

        return new Response(JSON.stringify({
            status: 200,
            data: data
        }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }), { headers: { 'Content-Type': 'application/json' } });
    }
}
