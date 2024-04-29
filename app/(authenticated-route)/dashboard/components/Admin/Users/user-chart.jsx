import { UserAccountChart } from "@/data/users-account-chart";
import AreaChartComponent from "./chart/AreaChart";
import { UserDataTable } from "./table/UserDataTable";
import { UsersData } from "@/data/users-table-data";
import { columns } from "./table/columns";
import { Suspense } from "react";
import Loading from "../../../Loading";

export default async function Users() {
    const users = await UsersData();
    const user_chart_data = await UserAccountChart();
    return (
        <div className="w-full grid grid-cols-1 gap-2 px-4 ">
            <div className="w-full sm:w-full md:w-full lg:w-full xl:full 2xl:full grid px-4 py-6 gap-4">

                <div className="w-full rounded-[15px] border-2 shadow-md">
                    <span className="py-4 px-4 text-xl tracking-wider uppercase font-semibold text-indigo-400">Users Chart</span>
                    <div className="w-full h-[350px] grid-cols-1 mt-4">
                        <Suspense fallback={<Loading />}>
                            <AreaChartComponent data={user_chart_data} />
                        </Suspense>
                    </div>
                </div >
            </div>

            <div className="w-full rounded-l-[30px] p-4">
                <div className="w-full rounded-[15px] border-2 shadow-md ">
                    <UserDataTable columns={columns} data={users} />
                </div>
            </div>
        </div>
    )
}