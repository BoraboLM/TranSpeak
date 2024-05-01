import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditUserModal from "../Modal/EditUserModal";
import { useState } from "react";

export default function DropdownAction({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleclick = () => {
        return setIsModalOpen(true)
    }
    return (
        <>
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
                    <DropdownMenuItem className="cursor-pointer" >
                        <span onClick={() => handleclick()}>Edit User Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" disabled={true}>View Users Complete Detail</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {isModalOpen && <EditUserModal user={user} onClose={() => setIsModalOpen(false)} />}
        </>
    )
}