import { auth } from "@/auth"
import { poppins } from "@/app/fonts";
import Sidebar from "./components/Sidebar/Sidebar";
import { redirect } from 'next/navigation'
import { Suspense } from "react";
import Loading from "./Loading";
import { AdminRoute } from "@/lib/Error-message/admin-route";

export const metadata = {
    title: "Dashboard"
}

export default async function DashboardLayout({ children }) {
    const session = await auth();

    if (session.user.role !== 'ADMIN') throw new AdminRoute();

    return (
        <Suspense fallback={<Loading />} >
            <div className={`w-full md:w-[100%] lg:w-[100%] min-h-[95vh] flex flex-1 bg-[#FFFF] mb-4 mt-4 gap-2 ${poppins.className}`}>
                <div className="w-[20%] rounded-r-[30px] bg-[#eeeeee] md:rounded-tr-[40px] lg:rounded-tr-[40px] xl:rounded-tr-[40px] 2xl:rounded-tr-[40px] py-0 hidden sm:hidden md:block lg:block">
                    <Suspense fallback={<Loading />}>
                        <Sidebar />
                    </Suspense>
                </div>
                <section className="w-full md:w-full lg:w-full min-h-[95vh] flex flex-1 bg-[#FFFF] mb-4 mt-4 gap-2">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </section>
            </div>
        </Suspense>
    )
}