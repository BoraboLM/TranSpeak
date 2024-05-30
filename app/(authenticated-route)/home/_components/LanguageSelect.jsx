"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { languages } from "./data/languages";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LanguageSelect({ name, control, source_value, setSourceValue, lang }) {
    const [sourceOpen, setSourceOpen] = useState(false);
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <Popover open={sourceOpen} onOpenChange={setSourceOpen}>
                        <PopoverTrigger asChild>

                            <Button
                                {...field}
                                className="border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between"
                                variant="secondary"
                                aria-expanded={sourceOpen}
                            >
                                <FormControl  >
                                    <span className="text-[16px]">
                                        {source_value
                                            ? lang.find((language) => language.value === source_value)?.label
                                            : "Select source Language..."}
                                    </span>

                                </FormControl>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search Lanugae..." />
                                <CommandList>
                                    <CommandEmpty>No Language found.</CommandEmpty>
                                    <CommandGroup>
                                        {lang.map((language, key) => (
                                            <CommandItem
                                                key={key}
                                                source_value={language.value}
                                                onSelect={(currentValue) => {
                                                    setSourceValue(currentValue === source_value ? "" : currentValue)
                                                    setSourceOpen(false)
                                                    field.onChange(currentValue === source_value ? "" : currentValue);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        source_value === language.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {language.label}
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