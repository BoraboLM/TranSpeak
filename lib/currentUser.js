import { auth } from "@/auth";

export default async function currentUser(){
    const session = await auth();

    return session.user;
}