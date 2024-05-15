"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return(
        <div className="h-[100vh] w-full">
            <div className="flex items-center justify-center space-x-4">
            <Skeleton className="h-55 w-full rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        </div>
    )
}