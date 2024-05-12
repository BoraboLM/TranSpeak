"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ActiveLink = ({ item, index }) => {
    const pathname = usePathname();

    return (
        <Link href={item.path} key={index} className={`${pathname === item.path && `bg-indigo-300`} flex items-center justify-start text-lg tracking-wider py-4 px-4 cursor-pointer font-[500] hover:bg-indigo-300 hover:fill-white ease-in-out`} prefetch={true}>
            {item.icon}
            <span className="">
                {item.name}
            </span>
        </Link>
    )
}
