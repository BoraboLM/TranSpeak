"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


export default function Team() {
    return (
        <HoverCard>
            <HoverCardTrigger className="text-xl font-[700] cursor-pointer hover:underline underline-offset-8 ease-in-out">Developer</HoverCardTrigger>
            <HoverCardContent>
                <div className="">
                    <h1 className="flex items-center text-xl font-[500] ">Members:</h1>
                    <ul className="">
                        <li className="text-lg font-[500] ">Borabo, Lawrence</li>
                        <li className="text-lg font-[500] ">Botolan, Blesy</li>
                        <li className="text-lg font-[500] ">Tonic, Kenneth</li>
                        <li className="text-lg font-[500] ">Santos, Jann Austin</li>
                        <li className="text-lg font-[500] ">Rovillos, Jacques</li>
                        <li className="text-lg font-[500] ">Elizalde, KC</li>
                    </ul>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}