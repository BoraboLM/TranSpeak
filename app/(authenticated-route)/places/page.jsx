import { auth } from "@/auth";
import LocationCity from "../components/Places_components/Location";
import TranSpeakMap from "../components/Places_components/Map";
import { SessionRole } from "@/lib/Error-message/admin-route";
import { cityData } from "@/data/map-city";

export const metadata = {
    title: "Places",
    description: "Explore the tourist Destinations in Pangasinan!"
}

export default async function Places() {
    const session = await auth();
    if (!session) throw new SessionRole();
    return (
        <section className="px-2 sm:px-4 md:px-6 lg:px-8 w-full md:w-[90%] lg:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">

                {/* Mapbox */}
                <div className="w-full flex justify-center items-center px-4 py-2">
                    <TranSpeakMap />
                </div>
            </div>
        </section>
    )
}