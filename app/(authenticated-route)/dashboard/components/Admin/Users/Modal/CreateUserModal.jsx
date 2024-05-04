"use client";

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountAdmin } from "@/app/action/create-account-admin";
import { CreateAccount } from "./Schema/CreateAccountSchema";


export function CreateUser() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState(null);
    const form = useForm({
        resolver: zodResolver(CreateAccount),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            nationality: "",
        }
    })

    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await createAccountAdmin(data);
            setMessage(response)
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-10 px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-400 hover:text-white ease-in-out"
                >Create User</Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-[400px] md:min-w-[600px] lg:min-w-[600px] bg-indigo-100">
                <DialogHeader>
                    <DialogTitle>Create Profile - Admin Permission</DialogTitle>
                    <DialogDescription>
                        By Default the role of this user will be set to Admin.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    {message && message.error && <div className="bg-red-500 text-white p-4 text-center text-wrap">
                        {message.error}
                    </div>}

                    {message && message.success &&
                        <div className="bg-green-400 text-white p-4 flex flex-col text-center text-wrap ">
                            <span className="text-xl font-[500] tracking-wide">
                                {message.success}
                            </span>
                            <span className="text-xl text-white">
                                {message.message}
                                <strong className="text-xl text-indigo-600 font-[700] tracking-widest">{message.defaultPass}</strong>
                            </span>
                        </div>}
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid w-full px-4">
                            <div className="grid grid-cols-2 gap-4 p-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    autocomplete="off"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="First Name" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    autocomplete="off"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Last Name" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 p-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    autocomplete="off"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="nationality"
                                    autocomplete="off"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nationality</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nationality" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex items-center justify-center content-center w-[60%] mx-auto border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out">{isPending ? "Registering User" : "Register User"}</Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
