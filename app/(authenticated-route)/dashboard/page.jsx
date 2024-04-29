export default function Dashboard() {
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <div className="text-center flex justify-center items-center text-xl font-[500]">
                <span>Static Data. Will be updated later?? haha</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 w-full gap-6 px-4 py-4">
                <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white">
                    <span className="text-2xl tracking-widest font-[600]">Total Translation Count</span>
                    <span className="text-mute text-xl tracking-wide">213,41</span>
                </div>
                <div className="h-[60px] sm:h-[100px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg  text-white">
                    <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Accounts</span>
                    <span className="text-mute text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">143</span>
                </div>
                <div className="h-[60px] sm:h-[100px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg  text-white">
                    <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Active Accounts</span>
                    <span className="text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">51</span>
                </div>
            </div>
        </div>
    )
}