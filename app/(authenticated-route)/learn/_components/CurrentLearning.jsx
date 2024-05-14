"use client";
import { useSearchParams } from "next/navigation";

export default function CurrentPageLearning() {
    // Fetch the query from the URL
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    return (
        <h1>
            <span>
                Your Query: {query || "No query found"}
            </span>
        </h1>
    )
}