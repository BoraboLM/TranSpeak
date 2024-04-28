import { UsersData } from "@/data/users-table-data";
import AreaChartComponent from "./_components/users_components/AreaChart";
import { columns } from "./_components/users_components/columns";
import { UserDataTable } from "./_components/users_components/UserDataTable";
import { UserAccountChart } from "@/data/users-account-chart";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Users() {
    const users = await UsersData();
    const user_chart_data = await UserAccountChart();
    return (
        <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full">
            {/* grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 */}
            <div className="grid px-4 py-6 gap-4">

                <div className="w-full rounded-[15px] border-2 shadow-md">
                    <span className="py-2 px-2 text-xl tracking-wider uppercase font-semibold text-indigo-400">Users Chart</span>
                    <div className="h-[350px] grid-cols-1">
                        <Suspense fallback={<Skeleton />}>
                            <AreaChartComponent data={user_chart_data} />
                        </Suspense>
                    </div>
                </div >
                {/* 
                <div className="grid grid-cols-2 gap-6 rouned-md">
                    <div className="w-full rounded-[15px] shadow-md">
                        <BarChartComponent />
                        <span className="py-2 px-2 text-xl tracking-wider uppercase font-semibold text-indigo-400">Users Chart</span>
                        <div className="h-[350px]">
                            <AreaChartComponent />
                        </div>
                    </div>

                    <div className="w-full rounded-[15px] border-2 shadow-md">
                        <LineChartComponent />
                        <span className="py-2 px-2 text-xl tracking-wider uppercase font-semibold text-indigo-400">Users Chart</span>
                        <div className="h-[350px]">
                            <AreaChartComponent />
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="w-full rounded-l-[30px] p-4">
                <div className="w-full rounded-[15px] border-2 shadow-md ">
                    <UserDataTable columns={columns} data={users} />
                </div>
            </div>
        </div>
    )
}