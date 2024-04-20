import { auth } from "@/auth"
import { poppins } from "@/app/fonts";

export const metadata = {
    title: "Dashboard"
}

const checkUserRole = async () => {
    const role = await auth();

    return role.user.role;
}


export default async function DashboardRoleLayout({ user, admin }) {
    const role = await checkUserRole()
    return <>
        {role === 'ADMIN' ? admin : user}
    </>
}