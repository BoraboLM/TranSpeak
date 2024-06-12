import { auth } from "@/auth";
import TranslationForm from "./_components/TranslationForm";
import { SessionRole } from "@/lib/Error-message/admin-route";

export const metadata = {
    title: "Home",
}

export default async function Home() {
    const session = await auth();

    if (!session) throw new SessionRole();
    return (
        <section className=" w-full md:w-full lg:w-full h-full mb-4 py-6">
            <div className="flex justify-center flex-center items-center flex-col py-10">
                <span className="text-[30px] sm:text-lg md:text-4xl lg:text-6xl font-[600] text-center mb-4">Welcome to TranSpeak</span>
                <div className="py-10">
                    <TranslationForm />
                </div>
            </div>
        </section>
    );
}