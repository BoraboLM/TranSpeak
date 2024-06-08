import { getWordsData } from "@/data/dictionary-words";
import StreamPage from "./components/StreamAudio";

export default async function Dictionary() {
    const data = await getWordsData();
    return (
        <section className="flex justify-center items-center px-2 sm:px-4 md:px-4 lg:px-8 w-full md:w-[90%] lg:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            {data.length > 0 ? (
                <StreamPage data={data} />
            ) : (
                <div className="flex justify-center items-center h-full w-full">
                    <h1 className="text-2xl font-bold text-gray-600 tracking-wider">No data available</h1>
                </div>
            )}
        </section>
    )
}