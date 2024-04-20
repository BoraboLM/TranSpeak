import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { loginSchema } from "./components/Forms/schema/loginSchema";
import { getUserEmail } from "./data/user";
import bcrypt from "bcryptjs";

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

                    if(passwordsMatch) return user;
                }

                return null;
            }
        }),
    ],
}

export default configuration;