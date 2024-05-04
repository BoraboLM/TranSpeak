import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { loginSchema } from "./components/Forms/schema/loginSchema";
import { getUserEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";
import { revalidatePath } from "next/cache";

const configuration = { 
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials){
                const validatedFields = loginSchema.safeParse(credentials);

                if(validatedFields.success){
                    const { email, password } = validatedFields.data;

                    // Checks if the user exists in the database
                    const user = await getUserEmail(email);

                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if(passwordsMatch){
                        await db.ActivityLogs.create({
                            data: {
                                userId: user.id,
                                action: "Login",
                                name: user.firstName + " " + user.lastName,
                                information: "User logged in",
                            }
                        })

                        revalidatePath("/dashboard/system-log");
                        return user;
                    }
                }

                return null;
            }
        }),
    ],
}

export default configuration;