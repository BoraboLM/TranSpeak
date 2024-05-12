import { currentUser } from "@/lib/currentUser"
import axios from "axios"
import { Suspense } from "react";
import CardSettings from "../components/Settings_Component/Card";

export async function GetPost() {
    const learnData = await axios.get('http://localhost:3000/api/v1/phrasebook')
    return learnData.data
}

export default async function Settings() {
    const data = await GetPost();
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full md:w-1/2 lg:w-[90%] mx-auto min-h-[95vh]">
            <Suspense fallback={<p>Loading Data...</p>}>
                <CardSettings data={data} />
            </Suspense>
        </section>
    )
}