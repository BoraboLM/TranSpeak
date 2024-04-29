"use client"

import { MutatingDots } from "react-loader-spinner"

export const Loading = () => {
    return (
        <div className="min-h-[100vh] min-w-[100vw] bg-indigo-200 flex justify-center items-center">
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#4F46E5"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>

    )
}