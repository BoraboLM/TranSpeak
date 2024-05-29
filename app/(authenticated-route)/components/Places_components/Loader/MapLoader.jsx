'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function MapLoader() {
    return (
        <div className="flex flex-col space-y-3">
            <div className="space-y-2">
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-full" />
            </div>
        </div>
    )
}