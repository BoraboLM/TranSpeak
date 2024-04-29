"use client"

import { data } from "@/app/(authenticated-route)/dashboard/data/data";
import { useCurrentUser } from '@/app/hooks/use-current-user';
import Link from "next/link";
import { ActiveLink } from "./ActiveLink/Active";

export default function Sidebar() {
    const session = useCurrentUser();
    return (
        <div className="flex flex-col">
            <div className="flex text-center flex-1 flex-col items-center border-b-2 border-mute p-10 bg-indigo-400 rounded-tr-lg">
                <span className="text-2xl sm:text-md md:text-[18px] xl:text-2xl 2xl:text-2xl font-[700] tracking-wide flex flex-row justify-center items-center gap-2 whitespace-nowrap text-white">
                    Admin Dashboard
                </span>
                <span className='font-semibold text-[14px] whitespace-nowrap text-white'>Hi, {session.name}!</span>
            </div>
            <div className="flex-1 flex-col justify-center items-center">
                {data.map((item, index) => (
                    <ActiveLink key={index} item={item} />
                ))}


            </div>
        </div>
    )
}