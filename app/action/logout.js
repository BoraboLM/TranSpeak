"use server";

import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const logout = async () => {
    const session = await auth();
    await db.ActivityLogs.create({
        data: {
            userId: session.user.id,
            action: "Logout",
            name: session.user.name,
            information: "User logged out",
        }
    })
    await signOut();
}