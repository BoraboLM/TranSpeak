import { getWordsData } from "@/data/dictionary-words";
import StreamPage from "./components/StreamAudio";

export const metadata = {
    title: "Dictionary",
    description: 'Dictionary for Filipino, English, Pangasinan, and Ilocano words.'
}

export default async function Dictionary() {
    const data = await getWordsData();
    return (
        <section className="flex justify-center items-center h-full px-2 sm:px-2 md:px-4 lg:px-4 w-full md:w-[90%] lg:w-[90%] mx-auto ">
            {data.length > 0 ? (
                <StreamPage data={data} />
            ) : (
                <div className="flex justify-center items-center min-h-screen h-full w-full">
                    <h1 className="text-2xl font-bold text-gray-600 tracking-wider">No data available</h1>
                </div>
            )}
        </section>
    )
}