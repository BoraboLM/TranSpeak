"use server";

import { db } from "@/lib/db";

import { CreateAccount } from "../(authenticated-route)/dashboard/components/Admin/Users/Modal/Schema/CreateAccountSchema";
import { getUserEmail } from "@/data/user";
import bcrypt from 'bcryptjs';
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { AdminAccount } from "@/lib/mail";

export const createAccountAdmin = async (data) => {
    const session = await auth();

    const { firstName, lastName, email, nationality} = data
    const validatedFields = CreateAccount.safeParse({firstName,lastName, email, nationality});

    if (!validatedFields.success) {
        return { error: "Invalid data!" }
    }

    const defaultPassword = `${firstName.toLowerCase()}${lastName.toLowerCase()}123`;

    const existingUser = await getUserEmail(email);

    if (existingUser) {
        return { error: "Account already exists!" }
    }

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await db.user.create({
        data: {
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            nationality: nationality,
            role: 'ADMIN',
            emailVerified: new Date(),
        }
    })

    await AdminAccount({email, firstName, adminName:session.user.name, defaultPassword})

    await db.ActivityLogs.create({
        data: {
            userId: session.user.id,
            action: `Account created with Admin role .`,
            name: session.user.name,
            information: `Admin ${session.user.name} created an account for ${firstName}.`,
        }
    })

    revalidatePath('/dashboard/users')

    return { success: "Account created!", message: `Account default password is: `, defaultPass: `${defaultPassword}`}
}