import ResetPassword from "@/components/Forms/ResetForm"


export const metadata = {
    title: "Forgot Password",
}

export default function ForgotPassword() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg ">
                <ResetPassword />
            </div>
        </section>
    )
}