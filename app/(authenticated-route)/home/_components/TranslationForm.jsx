"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { translateSchema } from './schema/translateSchema';
import { Textarea } from '@/components/ui/textarea';
import { languages } from "./data/languages";
import { useState } from "react";

export default function TranslationForm() {

    const [sourceOpen, setSourceOpen] = useState(false)
    const [targetOpen, setTargetOpen] = useState(false)
    const [sourceValue, setSourceValue] = useState("")
    const [targetValue, setTargetValue] = useState("")
    const form = useForm({
        resolver: zodResolver(translateSchema),
        defaultValues: {
            source: '',
            target: '',
            input: '',
        }
    })

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <>
            <div className="w-full px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                            <div>
                                <Card className="w-full sm:w-[500px] shadow-lg">
                                    <div>
                                        <CardHeader>
                                            <FormField
                                                control={form.control}
                                                name="source"
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
                                                                            {sourceValue
                                                                                ? languages.find((language) => language.value === sourceValue)?.label
                                                                                : "Select your Language..."}
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
                                                                            {languages.map((language, key) => (
                                                                                <CommandItem
                                                                                    key={key}
                                                                                    sourceValue={language.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setSourceValue(currentValue === sourceValue ? "" : currentValue)
                                                                                        setSourceOpen(false)
                                                                                        field.onChange(currentValue === sourceValue ? "" : currentValue);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            sourceValue === language.value ? "opacity-100" : "opacity-0"
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
                                        </CardHeader>
                                    </div>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="input"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter text to translate..."
                                                            className="resize-none shadow-xl"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <Card className="w-full sm:w-[500px] shadow-lg">
                                    <div>
                                        <CardHeader>
                                            <FormField
                                                control={form.control}
                                                name="target"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Popover open={targetOpen} onOpenChange={setTargetOpen}>
                                                            <PopoverTrigger asChild>

                                                                <Button
                                                                    {...field}
                                                                    className="border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between"
                                                                    variant="secondary"
                                                                    aria-expanded={targetOpen}
                                                                >
                                                                    <FormControl  >
                                                                        <span className="text-[16px]">
                                                                            {targetValue
                                                                                ? languages.find((language) => language.value === targetValue)?.label
                                                                                : "Select target Language..."}
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
                                                                            {languages.map((language, key) => (
                                                                                <CommandItem
                                                                                    key={key}
                                                                                    sourceValue={language.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setTargetValue(currentValue === targetValue ? "" : currentValue)
                                                                                        setTargetOpen(false)
                                                                                        field.onChange(currentValue === targetValue ? "" : currentValue);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            targetValue === language.value ? "opacity-100" : "opacity-0"
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
                                        </CardHeader>
                                    </div>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="output"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Translated text will appear here..."
                                                            className="resize-none shadow-md"
                                                            {...field}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4 w-full px-10  justify-center">
                            <Button type="submit" className=" w-full border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out">Translate</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}