"use client";

import { logout } from "@/app/action/logout";
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react';

export const SignOutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('location');
        logout();
    };
    return (
        <Button onClick={handleLogout} variant="ghost">
            <span className="flex items-center text-sm font-[500]">
                <LogOut className="mr-4" />
                Logout
            </span>
        </Button>
    )
}