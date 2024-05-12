import CardList from "../components/Admin/Learn/CardList"
import { revalidatePath } from "next/cache";
export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default async function LearnPage() {
    // The data that needs to be fetched in the db for cards will be;
    // title, description, topic, and dateCreated 
    const pangasinanData = [
        {
            id: 1,
            title: "Module 1",
            description: "Basic Greetings in Pangasinan",
            topic: "Greetings",
            dateCreated: "2021-10-20"
        },
    ]

    // For now, we will use dummy data from mockapi
    const phrasebookResponse = await fetch('https://6628925e54afcabd07362c21.mockapi.io/learn', revalidatePath('learn'));
    const phrasebookData = await phrasebookResponse.json();

    return (
        <div className="w-full rounded-l-[30px] p-2">
            <div className="flex justify-center flex-col items-center">
                <CardList
                    title={"Phrasebook"}
                    description={"Easy to use phrases."}
                    buttonName={"Create Phrase"}
                    link={"learn/phrasebook"}
                    data={phrasebookData}
                />

                <CardList
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
                    data={pangasinanData}
                />
            </div>
        </div>
    )
}