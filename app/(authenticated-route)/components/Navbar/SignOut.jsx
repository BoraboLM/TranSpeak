"use client";

import { logout } from "@/app/action/logout";
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react';

export const SignOutButton = () => {
    return (
        <Button onClick={() => { logout() }} variant="ghost">
            <span className="flex items-center text-sm font-[500]">
                <LogOut className="mr-4" />
                Logout
            </span>
        </Button>
    )
}