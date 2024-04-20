"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

// Data of nationalities
import { nationalities } from "@/app/(auth)/auth/data/nationalities";

// Zod schema
import { formSchema } from "./schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Signup } from "@/app/action/sign-up";
import { toast } from "../ui/use-toast";
import { useTransition } from "react";


export default function SignupForm() {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            nationality: ""
        }
    })

    const [message, setMessage] = useState(null);
    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await Signup(data)
            setMessage(response.data)
        });
    }

    useEffect(() => {
        if (message) {
            toast({
                variant: message[2].variant,
                title: message[1].type,
                description: message[0].message,
                duration: 4000
            });

            redirect("sign-in");
        }
    }, [message]);


    return (
        <div className="w-full">
            <Card >
                <CardHeader >
                    <CardTitle className="flex flex-col gap-4" >
                        <Button variant="ghost" size="icon" className="w-1/4 flex justify-start items-center border-b-2 border-transparent hover:border-indigo-500 duration-300 ease-in-out">
                            <Link href={"sign-in"} className="flex items-center">
                                <ChevronLeft className="h-6 w-6 mr-2" />
                                Return
                            </Link>
                        </Button>
                        <span className="text-2xl font-semibold text-wrap md:text-4xl ">Sign up to Trans-Speak</span>
                    </CardTitle>
                    <CardDescription>
                        <span className="text-lg text-wrap">Please fill up the form to continue.</span>
                    </CardDescription>
                    <div className="flex items-center justify-center text-xs uppercase">
                        <hr className="flex-grow border-indigo-400 border-b-2 mx-1 rounded-md" />
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col items-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        label="First Name"
                                        disabled={isPending}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-[500px] cursor-pointer justify-center" >First Name:</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="First Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        label="Last Name"
                                        disabled={isPending}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-[500px] cursor-pointer" >Last Name:</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Last Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Email */}
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        disabled={isPending}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-[500px] cursor-pointer" >Email:</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Password */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        label="Password"
                                        disabled={isPending}
                                        autoComplete="off"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-[500px] cursor-pointer" >Password:</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" type="password"{...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        autoComplete="off"
                                        label="Confirm"
                                        disabled={isPending}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg [500px] cursor-pointer text-wrap" >Confirm: </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Confirm Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                {/* Nationality */}
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="nationality"
                                        disabled={isPending}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg [500px] cursor-pointer text-wrap" >Nationality: </FormLabel>
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
                                </div>

                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    <Button type="submit" disabled={isPending} className="w-full border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out">{isPending ? "Signing up..." : "Sign up"}</Button>
                                </div>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}