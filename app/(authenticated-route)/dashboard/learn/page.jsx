import { PhrasebookModules } from "@/data/phrasebook-modules";
import LearnCard from "./components/Card";
import PhrasebookForm from "./components/PhrasebookForm";
import { auth } from "@/auth";
import { HistoryRecords } from "@/data/phrasebook-records";
import FooterPhrasebook from "./components/FooterPhrasebook";

export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default async function LearnPage() {
    const session = await auth();
    const phrasebookData = await PhrasebookModules();
    const historyData = await HistoryRecords();
    return (
        <div className="w-full rounded-l-[30px] px-2 py-2">
            <div className="flex flex-col gap-4">
                <LearnCard data={phrasebookData} />
                <PhrasebookForm data={phrasebookData} historyData={historyData} user={session.user.id} />
                <FooterPhrasebook data={phrasebookData} />
            </div>
        </div>
    )
}