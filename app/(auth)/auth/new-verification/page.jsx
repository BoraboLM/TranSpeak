import NewVerificationForm from "@/components/Forms/NewVerificationForm";

export const metadata = {
    title: "Verify Account",
}

export default function NewVerification() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg">
                <NewVerificationForm />
            </div>
        </section>
    )
}