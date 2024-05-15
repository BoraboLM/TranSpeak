import { pangasinanPhraseBook } from "@/data/phrasebook-data";
import SaveButton from "./component/SaveButton";
import { Suspense } from "react";
import Loading from "../../loading";

export async function generateMetadata({ params }) {
    const title = params.title.split('-');
    const capitalizedWords = title.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const ogTitle = capitalizedWords.join(' ');
    return {
        title: ogTitle,
        description: `Learn ${ogTitle} in Pangasinan`,
    };
}

export default async function PangasinanPhrases({ params }) {
    const words = params.title.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const originalTitle = capitalizedWords.join(' ');

    const data = await pangasinanPhraseBook({ title: originalTitle, language: "PANGASINAN" });

    return (
        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[95%] mx-auto min-h-[90vh] md:h-1/2 lg:h-[85%]">
            <div className="flex w-full p-4">
                <span className="tracking-widest text-2xl font-[900] py-4">{data[0].title} in {data[0].language}</span>
            </div>

            <div className="flex h-full w-full justify-center items-center">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-300 justify-between items-center">
                            <th className="px-8 py-4 text-left text-lg font-[700] text-gray-500 uppercase tracking-wider">English</th>
                            <th className="px-6 py-4 text-left text-lg font-[700] text-gray-500 uppercase tracking-wider">Pangasinan</th>
                        </tr>
                    </thead>
                    <Suspense fallback={<Loading />}>
                        <tbody className="border-2">
                            {data.map((item, index) => (
                                <tr key={index} className="rounded-xl bg-white border-b-2">
                                    <td className="px-2 py-4 whitespace-nowrap flex flex-row items-center gap-2">
                                        <SaveButton id={item.id} className="w-8 h-8" />
                                        <div className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-900">{item.english_word}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-900">{item.target_word}</div>
                                        <div className="text-sm italic text-gray-500">{item.pronounciation}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Suspense>
                </table>
            </div>
        </div>
    );
}
