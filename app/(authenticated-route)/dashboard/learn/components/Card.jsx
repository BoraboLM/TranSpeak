export default function LearnCard({ data }) {
    const phrasebookCount = data.length
    const pangasinanCount = data.filter((item) => item.language === "PANGASINAN").length
    const ilocanoCount = data.filter((item) => item.language === "ILOCANO").length

    // Initialize an empty array and check if the title is in the array it will skip itm otherwise it will add it to the array 
    const uniqueTitles = data.reduce((unique, item) => {
        return unique.includes(item.title) ? unique : [...unique, item.title];
    }, []);

    const categoryCount = uniqueTitles.length;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 w-full gap-6 px-4 py-4">
            <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white cursor-default p-2">
                <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Phrasebook Count</span>
                <span className="text-mute text-xl tracking-wide">{phrasebookCount}</span>
            </div>

            <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white cursor-default p-2">
                <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Pangasinan Phrasebook Count</span>
                <span className="text-mute text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{pangasinanCount}</span>
            </div>

            <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white cursor-default p-2">
                <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Ilocano Phrasebook Count</span>
                <span className="text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{ilocanoCount}</span>
            </div>

            <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white cursor-default p-2">
                <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Phrasebook Category Count</span>
                <span className="text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{categoryCount}</span>
            </div>
        </div>
    )
}