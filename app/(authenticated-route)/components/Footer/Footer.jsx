"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Team from "./_components/Teams";


export function Footer() {
    return (
        <footer className="min-h-[15vh] w-full md:w-[100%] lg:w-[100%] mx-auto flex items-center justify-center z-10 bg-[#cbedf6] px-8">
            <div className="flex justify-between w-full px-4 md:px-10">
                <div className="">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <p className="text-2xl font-[900] cursor-pointer tracking-wider">TranSpeak</p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xl font-400 tracking-wider">TranSpeak</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex space-x-4">
                    <Team />
                </div>
            </div>
        </footer>
    )
}