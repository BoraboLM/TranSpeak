import Link from "next/link";
import SidebarData from "./SidebarAccordion";

export default function LearnSidebar({ data }) {
    return (
        <div className="w-full h-full sm:flex sm:rounded-none sm:flex-row sm:justify-start sm:items-center sm:p-2 md:flex-col">
            <SidebarData data={data} />
        </div>
    )
}