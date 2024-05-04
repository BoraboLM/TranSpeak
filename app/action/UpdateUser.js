"use server";

import { CheckTime } from "@/data/check-time";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function  UpdateUser(_data, origData) {
    const { id, firstName, lastName,nationality, role } = _data;
    const user = await CheckTime({id})

    try{
        const cooldownMinutes = 10;

        if(!user){
            return {
                data: [
                    {message: `User not found!`},
                    {type: 'Error! '},
                    {variant: 'destructive'}
                ]
            }
        }
        // Check if the user is updating the same data and if the cooldown is still active
        const now = new Date();
        const updatedAt = new Date(user.updatedAt);
        // From milliseconds to seconds to minutes
        const diffInMinutes = (now - updatedAt) / 1000 / 60;
        if (diffInMinutes < cooldownMinutes) {
                return {
                data: [
                    {message: `You can update ${firstName} again in ${cooldownMinutes - Math.floor(diffInMinutes)} minutes`},
                    {type: 'Failed'},
                    {variant: 'destructive'}
                ]
            }
        }
        
        await db.user.update({
            where: {
                id: id
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                name: `${firstName} ${lastName}`,
                nationality: nationality,
                role: role
            }
        })


    await db.ActivityLogs.create({
        data: {
            userId: id,
            name: `${firstName} ${lastName}`,
            action: "Updated User Profile",
            information: `User Profile Updated. from ${origData.firstName}, ${origData.lastName},${origData.nationality} ${origData.role} to ${firstName}, ${lastName},${nationality}, ${role}`,
            createdAt: new Date(),
        }
    })

    revalidatePath("/dashboard/users")
    }catch(error){
        return {
            data: [
                {message: 'Oops! Something went wrong! Please try again.'},
                {type: 'Error! 🧐'},
                {variant: 'destructive'}
            ]
        }
    }
        return {
        data: [
            {message: 'User Updated Successfully!'},
            {type: 'Success! 🧐'},
            {variant: ''}
        ]
    }
}