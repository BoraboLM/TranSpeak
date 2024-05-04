import { auth, signOut } from "@/auth";
import LocationCity from "../components/Places_components/Location";
import AlertMessage from "../components/AlertMessage";

export const metadata = {
    title: "Places",
    description: "Explore the tourist Destinations in Pangasinan!"
}

export default function Places() {
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full md:w-1/2 lg:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            <div className=" flex justify-center items-center text-xl font-[500]">
                <AlertMessage
                    title="Places Not Available 😄"
                    message="Places feature Will be added soon!"
                />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center justify-center w-full sm:w-[90%] md:w-[90] lg:w-[90%] xl:w-[80%] 2xl:w-[80%] bg-2 bg-emerald-400 py-4 mt-8 rounded-2xl">
                    <LocationCity />
                </div>
            </div>
        </section>
    )
}