import { PhrasebookModules } from "@/data/phrasebook-modules";
import LearnCard from "./components/Card";
import PhrasebookForm from "./components/PhrasebookForm";
import { auth } from "@/auth";
export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default async function LearnPage() {
    const session = await auth();
    const phrasebookData = await PhrasebookModules();
    return (
        <div className="w-full rounded-l-[30px] px-2 py-2">
            <div className="flex flex-col gap-4">
                <LearnCard data={phrasebookData} />
                <PhrasebookForm data={phrasebookData} user={session.user.id} />
            </div>
        </div>
    )
}