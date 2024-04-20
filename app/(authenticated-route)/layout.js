import { poppins } from "@/app/fonts";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

// Location Context Provider
import { LocationProvider } from "./components/context/LocationProvide";

export default async function AuthenticatedLayout({ children }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <main className={`${poppins.className}`}>
                <LocationProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </LocationProvider>
            </main>
        </SessionProvider>
    );
}
