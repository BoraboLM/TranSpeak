import { useSession } from "next-auth/react";

// will be used for client side components
export const useCurrentUser = () => {
    const session = useSession();
    return session.data?.user;
}