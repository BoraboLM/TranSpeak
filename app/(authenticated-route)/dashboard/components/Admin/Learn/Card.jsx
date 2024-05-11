import Link from "next/link";
import Buttons from "./Buttons";
import { Button } from "@/components/ui/button";

export default function Card({ title, description, button, link, children }) {
    return (
        <div className="w-[90%] rounded-[15px] border-2 shadow-md  mt-4 hover:border-indigo-400 transition-all ease-in-out ">
            <div className="flex border-b-2 border-b-indigo-200 hover:border-indigo-400 transition-all ease-in-out">
                <div className="flex-1 justify-start items-start">
                    {/* Header of the Card */}
                    <Link href="learn/phrasebook">
                        <div className="flex flex-col">
                            <span className="pt-2 px-4 text-[40px] tracking-wider uppercase font-semibold text-indigo-400">{title}</span>
                            <span className="pb-2 px-4 text-sm tracking-wider uppercase font-semibold text-indigo-400">{description}</span>
                        </div>
                    </Link>
                </div>
                <div className="flex-1">
                    <div className="h-full flex flex-col justify-end items-end gap-4 px-6 py-4">
                        <Buttons name={button} />

                        <Buttons
                            variant={"ghost"}
                        >
                            <Link href={link}>
                                See all...
                            </Link>
                        </Buttons>
                    </div>
                </div>
            </div>
            {/* Card Body */}
            <div className="w-full h-[250px] grid grid-cols-1 p-3">
                {children}
            </div>
        </div>
    )
}