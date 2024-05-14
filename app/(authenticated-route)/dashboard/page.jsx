
import { ActiveAccounts, TotalAccounts, TotalTranslationCount } from "@/data/users-table-data";

export default async function Dashboard() {
    const activeUser = await ActiveAccounts();
    const totalNumberAccounts = await TotalAccounts();
    const totalTranslation = await TotalTranslationCount();

    const totalAccount = totalNumberAccounts.length;
    const TotalActiveAccounts = activeUser.length;
    const totalTranslations = totalTranslation.length;
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 w-full gap-6 px-4 py-4">
                <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white cursor-default">
                    <span className="text-2xl tracking-widest font-[600]">Total Translation Count</span>
                    <span className="text-mute text-xl tracking-wide">{totalTranslations}</span>
                </div>
                <div className="h-[60px] sm:h-[100px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg  text-white cursor-default">
                    <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Accounts</span>
                    <span className="text-mute text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{totalAccount}</span>
                </div>
                <div className="h-[60px] sm:h-[100px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg  text-white cursor-default">
                    <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Active Accounts</span>
                    <span className="text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{TotalActiveAccounts}</span>
                </div>
            </div>
        </div>
    )
}