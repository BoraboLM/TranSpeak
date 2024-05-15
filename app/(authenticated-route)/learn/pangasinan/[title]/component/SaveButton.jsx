"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export default function SaveButton({ id }) {
    const [isSaved, setIsSaved] = useState(false);
    const handleSave = () => {
        setIsSaved(!isSaved);
        // alert(`You Saved ${id}`);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        onClick={handleSave}
                    >
                        <Bookmark className={`${isSaved ? 'text-white' : ''} h-8 w-8`} fill={isSaved ? 'indigo' : 'none'} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {isSaved ? "Remove from Phrasebook" : "Save to Phrasebook"}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
