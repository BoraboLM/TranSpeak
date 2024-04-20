"use client";

import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react';
import Link from "next/link";
import { redirect } from "next/navigation";

export const SettingsButton = () => {
    return (
        <Button onClick={() => redirect('/settings')} variant="ghost">
            <Link href={'/settings'}>
                <span className="flex items-center text-sm font-[500]">
                    <Settings className="mr-4" />
                    Settings
                </span>
            </Link>
        </Button>
    )
}