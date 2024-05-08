import Header from "@/components/Reusable/Header";
import PlacesCard from "../components/Places/Places";

export default function AdminPlaces() {
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <Header title={"Places"} description={"Update Places Data."} />
            <div className="w-full mt-2 border-2">
                <PlacesCard />
            </div>
        </div>
    )
}