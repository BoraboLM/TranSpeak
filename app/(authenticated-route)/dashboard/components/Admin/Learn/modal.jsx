"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

import { useState } from "react";

export default function FormModal({ title }) {

    return (
        <Dialog>
            <DialogTrigger className="p-2 text-lg font-[500] tracking-wide bg-gray-300 rounded-lg hover:bg-gray-200 ease-in-out duration-200">
                {title}
            </DialogTrigger>
            <DialogContent className="w-full sm:w-full md:w-[800px] lg:w-[800px] xl:w-[800px] 2xl:w-[800px]">
            </DialogContent>
        </Dialog>

    )
}