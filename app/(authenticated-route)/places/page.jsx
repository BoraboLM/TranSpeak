import { auth, signOut } from "@/auth";

export const metadata = {
    title: "Places",
    description: "Explore the tourist Destinations in Pangasinan!"
}

export default function Places() {
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full md:w-1/2 lg:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            <h1>Places</h1>
        </section>
    )
}