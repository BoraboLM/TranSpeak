"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full grid grid-cols-1 gap-2 px-4 ">
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
        </div>
    )
}