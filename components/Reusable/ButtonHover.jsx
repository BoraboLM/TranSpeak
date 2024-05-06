"use client";

import { Button } from "../ui/button";

export default function ButtonHover({ isPending, current, initial }) {
    return (
        <Button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center content-center w-[60%] mx-auto border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out">{isPending ? `${initial}` : `${current}`}
        </Button>
    )
}