import { auth } from "@/auth"

export const currentUser = async () => {
    const user = await auth();

    return user?.user;
}