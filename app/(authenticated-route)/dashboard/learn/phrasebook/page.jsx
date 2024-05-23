import { PhrasebookData } from "@/data/phrasebook-data";
import PhrasebookList from "../components/phrasebook/PhrasebookList";

export default async function Phrasebook() {
    const data = await PhrasebookData();
    return (
        <div className="w-full rounded-l-[30px] px-2 py-2">
            <div className="flex flex-col gap-4">
                <PhrasebookList data={data} />
            </div>
        </div>
    )
}