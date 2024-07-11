import { poppins } from "@/app/fonts";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

// Location Context Provider
import { LocationProvider } from "./components/context/LocationProvide";
import LocationModal from "./components/LocationModal";
import { Suspense } from "react";
import ScrollToTop from "@/components/Reusable/ScrollToTop";
import PageLoading from "@/components/Reusable/PageLoading";
import { SessionRole } from "@/lib/Error-message/admin-route";

export default async function AuthenticatedLayout({ children }) {
    const session = await auth();
    if (!session) throw new SessionRole();
    return (
        <Suspense fallback={<PageLoading />}>
            <SessionProvider session={session}>
                    <main className={`${poppins.className}`}>
                        <LocationProvider>
                            <Navbar />
                            <LocationModal  />
                                {children}
                                <ScrollToTop />
                            <Footer />
                        </LocationProvider>
                    </main>
            </SessionProvider>
        </Suspense>
    );
}
