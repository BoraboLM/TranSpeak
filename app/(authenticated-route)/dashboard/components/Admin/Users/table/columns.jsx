"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import EditUserModal from "../Modal/EditUserModal";
import { useState } from "react";
import DropdownAction from "./DropdownAction";

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
                <DropdownAction user={user} />
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



