import { ActivityLogs } from "@/data/activity-logs";
import { DataTable } from "../components/Admin/SystemLogs/table/DataTable";
import { columns } from "../components/Admin/SystemLogs/table/columns"
import Header from "@/components/Reusable/Header";

export const metadata = {
    title: "System Logs | Admin Dashboard ",
    description: "System logs page for admin dashboard",
}

export default async function SystemLogs() {
    const data = await ActivityLogs();
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <Header title={"System Logs"} description={"View System Logs Data."} />
            <DataTable columns={columns} data={data} />
        </div>
    )
}