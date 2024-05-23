import { ActivityLogs } from "@/data/activity-logs";
import { DataTable } from "../components/Admin/SystemLogs/table/DataTable";
import { columns } from "../components/Admin/SystemLogs/table/columns"

export const metadata = {
    title: "System Logs | Admin Dashboard ",
    description: "System logs page for admin dashboard",
}

export default async function SystemLogs() {
    const data = await ActivityLogs();
    return (
        <div className="w-full rounded-l-[30px] px-2 py-2">
            <div className="w-full flex flex-col gap-4">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}