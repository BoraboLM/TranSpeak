import { IlocanoModules, PangasinanModules, PhrasebookModules } from "@/data/phrasebook-modules";
import CardList from "../components/Admin/Learn/CardList"
import { revalidatePath } from "next/cache";
import Link from "next/link";
import LearnCard from "./components/Card";
import PhrasebookForm from "./components/PhrasebookForm";
export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default async function LearnPage() {
    const phrasebookData = await PhrasebookModules();
    return (
        <div className="w-full rounded-l-[30px] px-2 py-2">
            <div className="flex flex-col gap-4">
                <LearnCard data={phrasebookData} />
                <PhrasebookForm />
            </div>
        </div>
    )
}