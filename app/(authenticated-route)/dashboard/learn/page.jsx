import Header from "@/components/Reusable/Header"
import AlertMessage from "../../components/AlertMessage"
import CardList from "../components/Admin/Learn/CardList"

export const metadata = {
    title: "Learn | Admin Dashboard ",
    description: "Learn page for admin dashboard",
}

export default function LearnPage() {
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <Header title={"Learn"} description={"Create a Learning Module."} />
            <div className="flex justify-center items-center">
                <CardList />
            </div>
        </div>
    )
}