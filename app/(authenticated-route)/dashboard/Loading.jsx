"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full min-h-[95vh] grid grid-cols-1 gap-2 px-4 ">
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-full h-[30px]" />
        </div>
    )
}