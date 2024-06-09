import { getWordsData } from "@/data/dictionary-words";
import StreamPage from "./components/StreamAudio";

export default async function Dictionary() {
    const data = await getWordsData();
    return (
        <section className="flex justify-center items-start mt-0 lg:mt-4 xl:mt-4 2xl:mt-4 px-2 sm:px-2 md:px-4 lg:px-4 w-full md:w-[90%] lg:w-[90%] mx-auto min-h-[90vh] md:h-3/4 lg:h-3/4">
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