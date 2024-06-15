"use client";
import { useSearchParams } from "next/navigation";

export default function CurrentPageLearning() {
    // Fetch the query from the URL
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    // SVG component
    const LearningIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-20 h-20 mb-4 text-indigo-700"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m0 4H8m4 0v-4M5.5 5a2.5 2.5 0 000 5h13a2.5 2.5 0 000-5h-13z"
            />
        </svg>
    );

    return (
        <div className="mt-6 w-full h-full flex flex-col gap-6 p-6 justify-center items-center bg-gradient-to-b from-indigo-200 to-indigo-400 text-white rounded-xl">
            <LearningIcon />
            <h1 className="text-[36px] font-bold tracking-wider">Learn New Phrases</h1>

            <p className="text-xl">Enhance your vocabulary with our curated phrases.</p>
        </div>
    );
}
