import NewPasswordForm from "@/components/Forms/NewPasswordForm";

export const metadata = {
    title: "Reset Password",
}

export default function NewPassword() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg">
                <NewPasswordForm />
            </div>
        </section>
    )
}