import { ErrorCard } from "@/components/Forms/Error-card";

export default function AuthError() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg">
                <ErrorCard />
            </div>
        </section>
    )
}