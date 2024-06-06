import { SaveAudio } from "@/app/action/dictionary/save-audio";

export async function POST(req){
    try {
        const { userId, baseFilename, wordFil, wordEng, wordIlo, wordPang, category_letter, baseFil, baseEng, baseIlo, basePang, downloadURLs } = await req.json();

        const saveData = await SaveAudio({ data: { userId, baseFilename, wordFil, wordEng, wordIlo, wordPang, category_letter, baseFil, baseEng, baseIlo, basePang } });

        if (saveData.data[0].status !== 200) {
            console.log("Error: ", saveData.data[0].message)
            return new Response(JSON.stringify({
                status: 500,
                message: saveData.data[0].message
            }));
        }

        return new Response(JSON.stringify({
            status: 200,
            message: 'Audio Uploaded! 🎉',
        }));

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }));
    }
}