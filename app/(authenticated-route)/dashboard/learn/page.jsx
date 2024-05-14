import { IlocanoModules, PangasinanModules, PhrasebookModules } from "@/data/phrasebook-modules";
import CardList from "../components/Admin/Learn/CardList"
import { revalidatePath } from "next/cache";
export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default async function LearnPage() {
    const [phrasebookData, pangasinanData, ilocanoData] = await Promise.all([
        PhrasebookModules(),
        PangasinanModules(),
        IlocanoModules()
    ]);
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <div className="flex justify-center flex-col items-center h-full">
                <CardList
                    title={"Phrasebook"}
                    description={"Easy to use phrases."}
                    buttonName={"Create Phrase"}
                    link={"learn/phrasebook"}
                    data={phrasebookData}
                />

                {/* <CardList
                    title={"Pangasinan"}
                    description={"Create a Learning module for Pangasinan"}
                    buttonName={"Create Learning"}
                    link={"learn/pangasinan"}
                    data={pangasinanData}
                />

                <CardList
                    title={"Ilocano"}
                    description={"Create a Learning module for Ilocano"}
                    buttonName={"Create Learning"}
                    link={"learn/ilocano"}
                    data={ilocanoData}
                /> */}
            </div>
        </div>
    )
}