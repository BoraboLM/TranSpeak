"use client"

import { Button } from "../ui/button";
import { Languages } from 'lucide-react';
import styles from "./button.module.css";
import Link from "next/link";


export default function CustomButton() {
    return (
        // <Button className={`${styles.customButton} flex items-center justify-center sm:w-[25%] md:w-[25%] lg:w-[25%] xl:w-[25%] h-[60px] `}>
        //     <Link href={'/home'} className="w-full">
        //         <span className="text-wrap font-medium xl:text-2xl sm:text-[12px] md:text-md lg:text-2xl">Click and Explore to Translate now</span>
        //         <Languages className="ml-[8px] size-[32px]" />
        //     </Link>
        // </Button>
        <Button className={`${styles.customButton} flex items-center justify-center sm:w-[25%] md:w-[25%] lg:w-[25%] xl:w-[25%] h-[60px] `}>
            <Link href={'/home'} className="flex items-center justify-center w-full">
                <span className="text-wrap font-medium xl:text-2xl sm:text-[12px] md:text-md lg:text-2xl">Click and Explore to Translate now</span>
                <Languages className="ml-[8px] size-[32px]" />
            </Link>
        </Button>
    )
}