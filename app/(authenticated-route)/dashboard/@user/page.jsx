import { auth } from "@/auth";

export default async function UserPage() {
    const session = await auth();
    return (
        <section className="w-full md:w-[100%] lg:w-[100%] min-h-[95vh] flex flex-1 bg-[#FFFF] mb-4 mt-4">
            <div className="w-[20%] rounded-r-[30px] bg-[#8fd2f7] md:rounded-tr-[40px] lg:rounded-tr-[40px] xl:rounded-tr-[40px] 2xl:rounded-tr-[40px] py-0 hidden sm:hidden md:block lg:block">
                <p className="text-4xl font-[500] ">this is left side bar</p>
            </div>
            <div className="w-full ml-4 bg-mute rounded-l-[30px] p-[15px] bg-[#eeeeee] ">
                <p className="">this is the main content</p>
            </div>
        </section>
    )
}