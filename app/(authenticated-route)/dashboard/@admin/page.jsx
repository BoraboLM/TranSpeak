
import { auth } from "@/auth";
import Sidebar from "./_components/sidebar";
import Content from "./_components/Content";

export default async function AdminPage() {

    return (
        <section className="w-full md:w-[100%] lg:w-[100%] min-h-[95vh] flex flex-1 bg-[#FFFF] mb-4 mt-4 gap-2">
            <div className="w-[20%] rounded-r-[30px] bg-[#eeeeee] md:rounded-tr-[40px] lg:rounded-tr-[40px] xl:rounded-tr-[40px] 2xl:rounded-tr-[40px] py-0 hidden sm:hidden md:block lg:block">
                <Sidebar />
            </div>
            {/* Contents */}
            <div className="w-full bg-mute rounded-l-[30px] p-[10px] bg-[#eeeeee]">
                <Content />
            </div>
        </section>
    )
}