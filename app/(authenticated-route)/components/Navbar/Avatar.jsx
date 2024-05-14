"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleUser } from 'lucide-react';
import { useSession } from "next-auth/react";
import { SignOutButton } from "./SignOut";
import { SettingsButton } from "./Settings";


export default function AvatarProfile() {
    const session = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Avatar className="mt-2">
                    {session && session.data?.user.image ? (
                        <AvatarImage src={session.data.user.image || <CircleUser color="white" />} />
                    ) : (
                        <AvatarFallback className="bg-blue-400">
                            <CircleUser color="white" />
                        </AvatarFallback>
                    )}
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-2" >
                <DropdownMenuLabel className="text-[16px]">{session.data.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SettingsButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}