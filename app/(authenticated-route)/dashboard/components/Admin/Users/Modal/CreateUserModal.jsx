"use client";

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

import { Form } from "@/components/ui/form"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountAdmin } from "@/app/action/create-account-admin";
import { CreateAccount } from "./Schema/CreateAccountSchema";
import { SelectInput } from "@/components/Reusable/SelectInput";
import ButtonHover from "@/components/Reusable/ButtonHover";
import FormInput from "@/components/Reusable/FormInput";

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
                                <FormInput
                                    control={form.control}
                                    name={"firstName"}
                                    label={"First Name"}
                                    type={"text"}
                                />

                                <FormInput
                                    control={form.control}
                                    name={"lastName"}
                                    label={"Last Name"}
                                    type={"text"}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 p-4">
                                <FormInput
                                    control={form.control}
                                    name={"email"}
                                    label={"Email"}
                                    type={"email"}
                                />

                                <SelectInput
                                    control={form.control}
                                    name="nationality"
                                    isPending={isPending}
                                />
                            </div>

                            <ButtonHover isPending={isPending} initial={"Registering User"} current={"Register User"} />
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
