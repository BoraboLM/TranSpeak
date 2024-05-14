import { poppins } from "@/app/fonts";
import LanguageImg from "@/app/assets/svg/language-img";
import LearnSidebar from "./_components/LearnSidebar";
import { Suspense } from "react";
import { PhrasebookData } from "@/data/phrasebook-data";

export default async function LearnLayout({ children }) {
    const data = await PhrasebookData();
    return (
        <section className={`w-full h-full ${poppins.className}`}>
            <div className="w-full h-[200px] bg-indigo-500/70 flex justify-between px-0 md:px-6 lg:px-8 xl:px-8 2xl:px-8 items-start flex-row">
                <div className="w-full h-full flex justify-start items-center px-8">
                    <div className="hidden sm:block">
                        <LanguageImg />
                    </div>
                    <div className="h-full justify-center items-center leading-none p-10">
                        <span className="text-wrap text-[15px] sm:text-[15px] sm:font-[400] md:text-[20px] md:font-[500] lg:text-[20px] xl:text-[25px] 2xl:text-[25px] font-[400] uppercase text-white">Pangasinan and Ilocano</span>
                        <h1 className="text-[40px] sm:text-[40px] sm:font-[400] md:text-[40px] md:font-[600] lg:md:text-[45px] xl:md:text-[45px] 2xl:text-[50px] font-[600] text-white leading-tight uppercase">phrasebooks</h1>
                        <div className="w-full leading-10 py-2">
                            <span className="leading-tight text-[18px] font-[400] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-white">Free phrasebook resources.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row bg-gray-300/40">
                <div className="w-full md:w-[300px] min-h-full bg-indigo-500/50 p-2 mt-2 mb-2 md:rounded-r-2xl lg:rounded-r-2xl xl:rounded-r-2xl 2xl:rounded-r-2xl ">
                    <LearnSidebar data={data}/>
                </div>
                <div className="w-full h-full p-4">
                    {children}
                </div>
            </div>
        </section>
    );
}
