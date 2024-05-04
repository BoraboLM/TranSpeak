import AlertMessage from "../../components/AlertMessage"

export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default function LearnPage() {
    return (
        <div className="w-full rounded-l-[30px]">
            <div className="flex justify-center items-center text-xl font-[500]">
                <AlertMessage
                    title="Learn for Admin 😄"
                    message="Learn for Admin feature Will be added soon!"
                />
            </div>
        </div>
    )
}