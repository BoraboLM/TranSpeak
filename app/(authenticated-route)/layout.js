import { poppins } from "@/app/fonts";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// Location Context Provider
import { LocationProvider } from "./components/context/LocationProvide";
import LocationModal from "./components/LocationModal";
import { Suspense } from "react";

export default async function AuthenticatedLayout({ children }) {
    const session = await auth();

    return (
            <SessionProvider session={session}>
                <Suspense >
                    <main className={`${poppins.className}`}>
                        <LocationProvider>
                            <Navbar />
                            <LocationModal  />
                                {children}
                            <Footer />
                        </LocationProvider>
                    </main>
                </Suspense>
            </SessionProvider>
    );
}
