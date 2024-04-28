"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

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
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "information",
        header: "Inforamtion",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    className="hover:bg-indigo-200"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date - Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            const formatted = date.toLocaleString('fil-PH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            return <div>{formatted}</div>
        },
    },
    {
        header: "More Actions",
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex justify-center items-center">
                    <DropdownMenu className="flex justify-center items-center">
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">More Actions</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.userId)}
                            >
                                Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
]