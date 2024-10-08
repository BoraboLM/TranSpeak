import { ilocanoPhrasebook } from "@/data/phrasebook-data";
import SaveButton from "./components/SaveButton";
import { Suspense } from "react";
import Loading from "../../loading";
import { auth } from "@/auth";
import { CheckBookmarkStatus } from "@/data/check-saved";
import { LearnItemRoute } from "@/lib/Error-message/admin-route";

export async function generateMetadata({ params }) {
    const title = params.title.split('-')
    const capitalizedWords = title.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const ogTitle = capitalizedWords.join(' ');
    return {
        title: ogTitle,
        description: `Learn ${ogTitle} in Ilocano`,
    }
}

export default async function IlocanoPhrases({ params }) {
    const session = await auth();
    const bookmarkedPhrases = await CheckBookmarkStatus({ userId: session.user?.id })

    const words = params.title.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const originalTitle = capitalizedWords.join(' ');

    const data = await ilocanoPhrasebook({ title: originalTitle, language: "ILOCANO" })
    if (!data[0].title) throw new LearnItemRoute();

    return (
        <div className=" w-full sm:w-[90%] md:w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[95%] mx-auto min-h-[90vh] md:h-1/2 lg:h-[85%] ">
            <div className="flex w-full p-4">
                <span className="tracking-widest text-2xl font-[900] py-4">{data[0].title} in {data[0].language}</span>
            </div>

            <div className="flex h-full w-full justify-center items-center">
                <table className="sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full justify-center items-center">
                    <thead>
                        <tr className="bg-gray-300 justify-between items-center">
                            <th className="px-8 py-4 text-left text-lg font-[700] text-gray-500 uppercase tracking-wider w-[50%]">English</th>
                            <th className="px-6 py-4 text-left text-lg font-[700] text-gray-500 uppercase tracking-wider w-[50%]">Ilocano</th>
                        </tr>
                    </thead>

                    <Suspense fallback={<Loading />}>
                        <tbody className="border-2">
                            {data.map((item, index) => (
                                <tr key={index} className="rounded-xl bg-white border-b-2 border-separate gap-2">
                                    <td className="px-4 py-4 text-wrap">
                                        <div className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-900 w-[50%]">{item.english_word}</div>
                                    </td>
                                    <td className="px-4 py-4 text-wrap">
                                        <div className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-900 text-wrap w-[50%]">{item.target_word}</div>
                                        <div className="text-sm italic text-gray-500 text-wrap">{item.pronounciation}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Suspense>
                </table>
            </div>
        </div>
    )
}