'use client';
import { useEffect, useState } from 'react';
import { dataLinks } from "./dataLinks/dataLinks";
import Link from "next/link";
import AvatarProfile from "./Avatar";
import { Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { SessionRole } from "@/lib/Error-message/admin-route";
import styles from './Navbar.module.css';

export function Navbar() {
    console.log("%cNote:", "font-size: 50px; color: blue; font-weight: bold;");
    console.log("%cThis is a Capstone Project developed by Lawrence", "font-size: 16px; color: gray;");
    console.log("%cSee https://www.facebook.com/borabo.lawrence for more information.", "font-size: 16px; color: blue; text-decoration: underline;");

    const [isSticky, setIsSticky] = useState(false);
    const session = useCurrentUser();
    if (!session) throw new SessionRole();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`w-full h-[8vh] md:h-[8vh] lg:h-[8vh] xl:h-[8vh] 2xl:h-[8vh] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 bg-white shadow-lg z-50 ${isSticky ? styles.sticky : ''}`}>
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
                <div className="sm:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Menu className="h-6 w-6 text-gray-900 mt-1" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[60%]">
                            <div className="mt-12 flex flex-col gap-4">
                                {dataLinks.map((link, index) => (
                                    <Link key={index} href={link.path}>
                                        <SheetClose asChild>
                                            <span className="text-2xl font-medium text-gray-600 hover:text-gray-900">{link.name}</span>
                                        </SheetClose>
                                    </Link>
                                ))}
                                {session.role === "ADMIN" && (
                                    <>
                                        <Link href="/dashboard">
                                            <SheetClose asChild>
                                                <span className="text-2xl font-medium text-gray-600 hover:text-gray-900">Dashboard</span>
                                            </SheetClose>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <Link href="/home">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">TranSpeak</span>
                </Link>
                <div className="hidden sm:flex space-x-4">
                    {dataLinks.map((link, index) => (
                        <Link key={index} href={link.path} prefetch={true}>
                            <span className="text-sm sm:text-lg font-medium text-gray-600 hover:text-gray-900">{link.name}</span>
                        </Link>
                    ))}
                    {session.role === "ADMIN" && (
                        <>
                            <div className="hidden sm:flex space-x-4">
                                <Link href="/dashboard" prefetch={true}>
                                    <span className="text-sm sm:text-lg font-medium text-gray-600 hover:text-gray-900">Dashboard</span>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div>
                <AvatarProfile />
            </div>
        </nav>
    );
}
