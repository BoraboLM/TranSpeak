import { currentUser } from "@/lib/currentUser"

export default async function Settings() {
    const user = await currentUser();
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full sm:w-full md:w-1/2 lg:w-[90%] mx-auto h-full md:h-1/2 lg:h-[80%]">
            <h1>Settings</h1>
            <p>{user.name}</p>
        </section>
    )
}