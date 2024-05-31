
import LoginForm from "@/components/Forms/LᴏginForm"

export const metadata = {
    title: "Sign In",
}

export default function SignIn() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg">
                <LoginForm />
            </div>
        </section>
    )
}