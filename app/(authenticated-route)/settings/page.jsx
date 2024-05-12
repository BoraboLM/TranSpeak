import { Suspense } from "react";
import CardSettings from "../components/Settings_Component/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loading } from "@/app/Loading";
import UserActivity from "../components/Settings_Component/UserActivity";
import { auth } from "@/auth";
import { UserActivityLogs } from "@/data/user-activity";

export const metadata = {
    title: "Settings",
}

export default async function Settings() {
    const session = await auth();
    const data = await UserActivityLogs(session.user.id);
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full sm:w-full md:w-[80%] lg:w-[90%] mx-auto min-h-[95vh]">
            <Suspense fallback={<Loading />}>
                {/* <CardSettings data={data} /> */}
                <div className="w-full h-full flex justify-center items-center mt-8">
                    <Tabs defaultValue="account" className="w-full sm:w-full md:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[80%]">
                        <div className="flex justify-center items-center">
                            <TabsList className="w-full">
                                <TabsTrigger
                                    value="account"
                                    className="w-full text-[20px] hover:bg-indigo-200 ease-in-out duration-300">
                                    Account
                                </TabsTrigger>

                                <TabsTrigger
                                    value="password"
                                    className="w-full text-[20px] hover:bg-indigo-200 ease-in-out duration-300">
                                    Password
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ActivityLogs"
                                    className="w-full text-[20px] hover:bg-indigo-200 ease-in-out duration-300">
                                    User Activity Logs
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="account">Make changes to your account here.</TabsContent>
                        <TabsContent value="password">Change your password here.</TabsContent>
                        <TabsContent value="ActivityLogs">
                            <UserActivity user_data={data} />
                        </TabsContent>
                    </Tabs>
                </div>
            </Suspense>
        </section>
    )
}