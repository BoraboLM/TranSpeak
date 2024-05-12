import Users from "../components/Admin/Users/user-chart";

export const metadata = {
    title: "Users | Admin Dashboard ",
    description: "Users page for admin dashboard",
}

export default function UsersPage() {
    return (
        <div className="w-full rounded-l-[30px] p-2">
            <Users />
        </div>
    )
}