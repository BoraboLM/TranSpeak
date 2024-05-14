import CurrentPageLearning from "./_components/CurrentLearning";

export const metadata = {
    title: "Learn",
}

export default async function Learn() {
    return (
        <section className=" w-full sm:w-[90%] md:w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[95%] mx-auto min-h-[90vh] md:h-1/2 lg:h-[85%] ">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-[30px] font-[600] tracking-wider text-gray-500">Hellooo</h1>
                <CurrentPageLearning />
            </div>
        </section>
    );
}