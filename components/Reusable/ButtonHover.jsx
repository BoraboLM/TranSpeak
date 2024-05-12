"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function ButtonHover({ isPending, current, initial }) {
    return (
        <Button
            type="submit"
            disabled={isPending}
            className={`flex items-center justify-center content-center w-full border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out`}
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline" />
                    {initial}
                </>
            ) : (
                current
            )}
        </Button>
    )
}