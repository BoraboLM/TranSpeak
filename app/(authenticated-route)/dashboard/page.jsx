
import { ActiveAccounts, TotalAccounts } from "@/data/users-table-data";
import AlertMessage from "../components/AlertMessage";
import Header from "@/components/Reusable/Header";

export default async function Dashboard() {
    const activeUser = await ActiveAccounts();
    const totalNumberAccounts = await TotalAccounts();

    const totalAccount = totalNumberAccounts.length;
    const TotalActiveAccounts = activeUser.length;
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <Header title={"Dashboard"} description={"View Systems Data."} />
            {/* <div className=" flex justify-center items-center text-xl font-[500]">
                <AlertMessage title="Dashboard Data 😄 Will be added soon" message="The Total Translation is Static. The rest is dynamic." />
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 w-full gap-6 px-4 py-4">
                <div className="h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg text-white">
                    <span className="text-2xl tracking-widest font-[600]">Total Translation Count</span>
                    <span className="text-mute text-xl tracking-wide">213,41</span>
                </div>
                <div className="h-[60px] sm:h-[100px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg  text-white">
                    <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Accounts</span>
                    <span className="text-mute text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{totalAccount}</span>
                </div>
                <div className="h-[60px] sm:h-[100px] md:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px] w-full flex items-center justify-center flex-col text-center bg-indigo-500 rounded-lg  text-white">
                    <span className="text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl tracking-widest font-[600]">Total Active Accounts</span>
                    <span className="text-mute text-md sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-xl tracking-wide font-[500]">{TotalActiveAccounts}</span>
                </div>
            </div>
        </div>
    )
}