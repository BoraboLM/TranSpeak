"use client";

import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";

export const SelectCategoryInput = ({ control, name, isPending, data }) => {
    const [open, setOpen] = useState(false);
    const [dataValue, setDataValue] = useState("");
    return (
        <FormField
            control={control}
            name={name}
            disabled={isPending}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg">Category: </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                {...field}
                                className="border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between"
                                variant="secondary"
                                aria-expanded={open}
                            >
                                <FormControl  >
                                    <span className="text-sm font-normal">
                                        {dataValue
                                            ? data.find((category) => category.value === dataValue)?.label
                                            : "Select Existing Category..."}
                                    </span>
                                </FormControl>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search Category..." />
                                <CommandList>
                                    <CommandEmpty>No Category found. Try Creating New</CommandEmpty>
                                    <CommandGroup>
                                        {data.map((category, key) => (
                                            <CommandItem
                                                key={key}
                                                value={category.value}
                                                onSelect={(currentValue) => {
                                                    setDataValue(currentValue === dataValue ? "" : currentValue)
                                                    setOpen(false)
                                                    field.onChange(currentValue === dataValue ? "" : currentValue);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        dataValue === category.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {category.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
