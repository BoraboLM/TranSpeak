import AreaChartComponent from "./chart/AreaChart";
import { Suspense } from "react";
import Loading from "../../../Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAccountChart } from "@/data/users-account-chart";

import { UserDataTable } from "./table/UserDataTable";
import { columns } from "./table/columns";
import { AdminDataTable } from "./table/AdminDataTable";
import { AdminColumns } from "./table/AdminColumns";

import { AdminData, DisabledData, UsersData } from "@/data/users-table-data";
import PrintTableData from "../../Users/Print";

export default async function Users() {
    const users = await UsersData();
    const admin = await AdminData();
    const disabled = await DisabledData()
    const user_chart_data = await UserAccountChart();
    return (
        <div className="w-full grid grid-cols-1 gap-2 px-4 ">
            <div className="w-full sm:w-full md:w-full lg:w-full xl:full 2xl:full grid px-4 py-6 gap-4">

                <div className="w-full rounded-[15px] border-2 shadow-md">
                    <span className="p-4 text-xl tracking-wider uppercase font-semibold text-indigo-400">Users Chart</span>
                    <div className="w-full h-[350px] grid-cols-1 mt-4">
                        <Suspense fallback={<Loading />}>
                            <AreaChartComponent data={user_chart_data} />
                        </Suspense>
                    </div>
                </div >
            </div>

            <div className="w-full rounded-l-[30px] p-4">
                <div className="w-full rounded-[15px] border-2 shadow-md ">
                    <Tabs defaultValue="users" className="w-full p-2 gap-2">
                        <TabsList>
                            <TabsTrigger value="users">
                                <span className="text-lg text-gray-600 font-[600] tracking-widest">Users</span>
                            </TabsTrigger>

                            <TabsTrigger value="disabled">
                                <span className="text-lg text-gray-600 font-[600] tracking-widest">Disabled Accounts</span>
                            </TabsTrigger>

                            <TabsTrigger value="admin">
                                <span className="text-lg text-gray-600 font-[600] tracking-widest">Admin</span>
                            </TabsTrigger>

                            <PrintTableData data={users}/>
                        </TabsList>

                        {/* Tabs(USERS - DISABLED ACCOUNTS - ADMIN) */}
                        <TabsContent value="users" className="w-full">
                            <UserDataTable
                                columns={columns}
                                data={users}
                                title="Users List"
                            />
                        </TabsContent>

                        <TabsContent value="disabled">
                            <UserDataTable
                                columns={columns}
                                data={disabled}
                                title="Disabled Accounts List"
                            />
                        </TabsContent>

                        <TabsContent value="admin">
                            <AdminDataTable
                                columns={AdminColumns}
                                data={admin}
                                title="Admin List"
                            />
                        </TabsContent>
                    </Tabs>

                    
                </div>
            </div>
        </div>
    )
}