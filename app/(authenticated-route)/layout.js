import { poppins } from "@/app/fonts";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// Location Context Provider
import { LocationProvider } from "./components/context/LocationProvide";
import LocationModal from "./components/LocationModal";
import { NationalityModal } from "./components/NationalityModal";
import { Suspense } from "react";
import { Loading } from "../Loading";

export default async function AuthenticatedLayout({ children }) {
    const session = await auth();

    return (
        <Suspense fallback={ <Loading /> }>
            <SessionProvider session={session}>
                <main className={`${poppins.className}`}>
                    <LocationProvider>
                        <Navbar />
                        <LocationModal  />
                        {children}
                        <Footer />
                    </LocationProvider>
                </main>
            </SessionProvider>
        </Suspense>
    );
}
