import AlertMessage from "../components/AlertMessage";
import HeaderTab from "./_components/HeaderTab";

export const metadata = {
    title: "Learn",
}

export default function Learn() {
    return (
        // md:px-6 mx-auto
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%] mx-auto min-h-[90vh] md:h-1/2 lg:h-3/4">
            <div className=" flex justify-center items-center text-xl font-[500]">
                <AlertMessage
                    title="Learn Not Available 😄"
                    message="Learn feature Will be added soon!"
                />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center justify-center w-full sm:w-[90%] md:w-[90] lg:w-[90%] xl:w-[80%] 2xl:w-[80%] bg-2 bg-emerald-400 py-4 mt-8 rounded-2xl">
                    <HeaderTab />
                </div>
            </div>
        </section>
    );
}