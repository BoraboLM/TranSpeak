"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export const columns = [
    {
        // accessorKey: "id",
        header: "No.",
        cell: ({ row }) => {
            const index = row.index + 1;
            return <div>{index}</div>
        }
    },
    {
        accessorKey: "id",
        header: "User ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    // {
    //     accessorKey: "nationality",
    //     header: "nationality",
    // },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        header: "More Actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" >
                        <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">Edit User</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">View Users Complete Detail</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    // {
    //     accesskey: "emailVerified",
    //     header: "Email Verified",
    // },
    // {
    //     accessorKey: "createdAt",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 className="hover:bg-indigo-200"
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Account Created
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         const date = new Date(row.getValue("createdAt"));
    //         const formatted = date.toLocaleString('fil-PH', {
    //             year: 'numeric',
    //             month: '2-digit',
    //             day: '2-digit',
    //             hour: '2-digit',
    //             minute: '2-digit',
    //             hour12: true
    //         });

    //         return <div>{formatted}</div>
    //     },
    // },
]



