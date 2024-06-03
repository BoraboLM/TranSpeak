import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import styles from "@/app/root.module.css"
import { Suspense } from "react";
import PageLoading from "@/components/Reusable/PageLoading";

// Font
const poppins = Poppins({ subsets: ["latin"], weight: "400"});

export const metadata = {
    title: "Trans-Speak",
    description: "Trans-speak is a web-based application for Capstone Project.",
};



export default function AuthLayout({ children }) {

    return (
        <main className={`${poppins.className} ${styles.gradient} h-screen w-screen`}>
            <Suspense fallback={<PageLoading />}>
                {children} 
            </Suspense>
        </main>
    )
}

