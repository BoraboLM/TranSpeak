"use client";

import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";

import { nationalities } from "@/app/(auth)/auth/data/nationalities";

export const SelectInput = ({ control, name, isPending }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <FormField
            control={control}
            name={name}
            disabled={isPending}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Nationality: </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                {...field}
                                className="border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between"
                                variant="secondary"
                                aria-expanded={open}
                            >
                                <FormControl  >
                                    <span className="text-[16px]">
                                        {value
                                            ? nationalities.find((nationality) => nationality.value === value)?.label
                                            : "Select your Nationality..."}
                                    </span>
                                </FormControl>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search Nationality..." />
                                <CommandList>
                                    <CommandEmpty>No Nationality found.</CommandEmpty>
                                    <CommandGroup>
                                        {nationalities.map((nationality, key) => (
                                            <CommandItem
                                                key={key}
                                                value={nationality.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setOpen(false)
                                                    field.onChange(currentValue === value ? "" : currentValue);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === nationality.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {nationality.label}
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
