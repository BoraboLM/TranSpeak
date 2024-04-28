
import { ActivityLogs } from "@/data/activity-logs";
import { DataTable } from "../DataTable";
import { columns } from "../columns";

export default async function UserActivityLogs() {
    const data = await ActivityLogs();
    return (
        <div className="w-full rounded-l-[30px]">
            <DataTable columns={columns} data={data} />
        </div>
    )
}