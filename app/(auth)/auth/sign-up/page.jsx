import SignupForm from "@/components/Forms/SignupForm"

export const metadata = {
    title: "Sign Up",
    description: "Sign up to Trans-Speak"
}

export default function SignUp() {
    return (
        <section className="h-screen w-screen flex items-center justify-center content-center flex-col">
            <div className="rounded-lg ">
                <SignupForm />
            </div>
        </section>
    )
}