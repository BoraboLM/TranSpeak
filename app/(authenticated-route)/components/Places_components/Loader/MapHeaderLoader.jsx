'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function MapHeaderLoader() {
    return (
        <div className="flex flex-col space-y-3">
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    )
}