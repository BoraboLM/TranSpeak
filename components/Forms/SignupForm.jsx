"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link"


// Zod schema
import { formSchema } from "./schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Signup } from "@/app/action/sign-up";
import { toast } from "../ui/use-toast";
import { useTransition } from "react";
import { SelectInput } from "../Reusable/SelectInput";
import FormInput from "../Reusable/FormInput";


export default function SignupForm() {
    const [isPending, startTransition] = useTransition();

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

                            {/* First Name and Last Name */}
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        control={form.control}
                                        isPending={isPending}
                                        name={"firstName"}
                                        label={"First Name"}
                                    />

                                    <FormInput
                                        control={form.control}
                                        isPending={isPending}
                                        name={"lastName"}
                                        label={"Last Name"}
                                    />
                                </div>

                                {/* Email */}
                                <div className="grid grid-cols-1 gap-4">
                                    <FormInput
                                        control={form.control}
                                        isPending={isPending}
                                        name={"email"}
                                        label={"Email"}
                                    />
                                </div>

                                {/* Password */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        control={form.control}
                                        isPending={isPending}
                                        name={"password"}
                                        label={"Password"}
                                        type={"password"}
                                    />

                                    <FormInput
                                        control={form.control}
                                        isPending={isPending}
                                        name={"confirmPassword"}
                                        label={"Confirm Password"}
                                        type={"password"}
                                    />
                                </div>

                                {/* Nationality */}
                                <div className="grid grid-cols-1 gap-4">
                                    <SelectInput
                                        control={form.control}
                                        name="nationality"
                                        isPending={isPending}
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