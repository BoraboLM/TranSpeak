import { PangasinanModuleCount, IlocanoModuleCount, phrasebookModuleCount } from "@/data/module-count";
import Content from "./_components/Content";
import HeaderTab from "./_components/HeaderTab";

export const metadata = {
    title: "Learn",
}

export default async function Learn() {
    const [pangasinanData, ilocanoData, phrasebookData] = await Promise.all([
        PangasinanModuleCount(),
        IlocanoModuleCount(),
        phrasebookModuleCount()
    ]);
    // console.log("pagasinan: ", pangasinanData, "\n", "ilocano: ", ilocanoData, "\n", "phrasebook: ", phrasebookData)
    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-full sm:w-[90%] md:w-[90] lg:w-[90%] xl:w-[80%] 2xl:w-[80%] bg-2 bg-gradient-to-r from-indigo-400 to-emerald-300 py-4 mt-8 rounded-2xl">
                    <HeaderTab />
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 p-4 gap-6 mt-6">
                    <Content
                        title={"Phrasebook"}
                        description={"Phrasebook. :)"}
                        url={"phrasebook"}
                        count={phrasebookData}
                    />

                    <Content
                        title={"Pangasinan"}
                        description={"Learn Pangasinan"}
                        url={"pangasinan"}
                        count={pangasinanData}
                    />

                    <Content
                        title={"Ilocano"}
                        description={"Learn Ilocano"}
                        url={"ilocano"}
                        count={ilocanoData}
                    />
                </div>
            </div>
        </section>
    );
}