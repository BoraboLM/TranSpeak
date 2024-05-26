import { auth } from "@/auth";
import GeolocationComponent from "../components/Places_components/ExampleLocation";
import LocationCity from "../components/Places_components/Location";
import TranSpeakMap from "../components/Places_components/Map";
import { SessionRole } from "@/lib/Error-message/admin-route";

export const metadata = {
    title: "Places",
    description: "Explore the tourist Destinations in Pangasinan!"
}

export default async function Places() {
    const session = await auth();
    if (!session) throw new SessionRole();
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full md:w-1/2 lg:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-center w-full sm:w-[90%] md:w-[90] lg:w-[90%] xl:w-[80%] 2xl:w-[80%] bg-2 bg-emerald-400 py-4  rounded-2xl mt-4">
                    <LocationCity />
                </div>
                <GeolocationComponent />
                {/* Mapbox */}
                <div className="w-full flex justify-center items-center px-4 py-2">
                    <TranSpeakMap />
                </div>

            </div>
        </section>
    )
}