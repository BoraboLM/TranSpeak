"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { CheckBookmarkStatus } from "@/data/check-saved";
import { BookmarkPhrasebook } from "@/app/action/SavePhrasebook/bookmark-phrase";

export default function SaveButton({ id, data }) {
    const session = useSession();
    const [isPending, startTransition] = useTransition();
    const [isSaved, setIsSaved] = useState(false);
    const [message, setMessage] = useState(null);


    const userId = session.data?.user.id;
    const phraseId = id;

    const handleSave = async () => {
        startTransition(async () => {
            const response = await BookmarkPhrasebook(userId, phraseId);
            setMessage(response);
        });
    };

    useEffect(() => {
        if (data) {
            console.log('data', data.map((item) => item.phrasebook.name)), ': ', data.map((item) => item.phrasebook.id === phraseId);
        }
    }, [data, phraseId])

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
