"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function  UpdateUser(_data, origData) {
    const { id, firstName, lastName, role } = _data;

    try{
        await db.user.update({
            where: {
                id: id
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                name: `${firstName} ${lastName}`,
                role: role
            }
        })


    await db.ActivityLogs.create({
        data: {
            userId: id,
            name: `${firstName} ${lastName}`,
            action: "Updated User Profile",
            information: `User Profile Updated. from ${origData.firstName}, ${origData.lastName}, ${origData.role} to ${firstName}, ${lastName}, ${role}`,
            createdAt: new Date(),
        }
    })

    revalidatePath("/dashboard/users")
    }catch(error){
        return {error: "Something went wrong, please try again..."}
    }

        return {success: "User updated successfully!"}
}