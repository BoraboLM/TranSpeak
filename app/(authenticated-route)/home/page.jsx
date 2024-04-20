import { auth } from "@/auth";
import TranslationForm from "./_components/TranslationForm";

export const metadata = {
    title: "Home",
}

export default async function Home() {
    const session = await auth();

    return (
        <section className="px-4 sm:px-4 md:px-6 lg:px-8 w-full md:w-1/2 lg:w-[90%] min-h-[95vh] mx-auto">
            <div className="flex justify-center flex-center items-center flex-col py-10">
                <span className="text-2xl sm:text-lg md:text-4xl lg:text-6xl font-[600] text-center">Welcome to Trans-Speak</span>
                <div className="py-10">
                    <TranslationForm />
                </div>
            </div>
        </section>
    );
}