import { AnalyticWordsCount, OverallAnalytics, WeeklyAnalytics } from "@/data/analytics/analytics";

export async function GET(req, res) {
    try {
        const url = new URL(req.url);
        const params = new URLSearchParams(url.searchParams);
        const type = params.get('type');
        const month = params.get('month');
        const year = params.get('year');

        let data;

        switch (type) {
            case 'monthly':
                data = await AnalyticWordsCount(Number(month), Number(year));
                break;
            case 'overall':
                data = await OverallAnalytics();
                break;
            case 'weekly':
                data = await WeeklyAnalytics();
                break;
            default:
                throw new Error('Invalid type parameter');
        }

        return new Response(JSON.stringify({
            status: 200,
            data: data
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }));
    }
}
