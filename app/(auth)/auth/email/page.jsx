import LoginWithEmail from "@/components/Forms/LoginWithEmail"

export const metadata = {
    title: "Sign in with Email",
    description: "Sign passwordless using your email address",
}

export default function SigninWithEmail() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg">
                <LoginWithEmail />
            </div>
        </section>
    )
}