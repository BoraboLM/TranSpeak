"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { newPasswordSchema } from "./schema/NewPasswordSchema";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/app/action/new-password";
import FormInput from "../Reusable/FormInput";

export default function NewPasswordForm() {
    const token = useSearchParams().get("token");
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const [message, setMessage] = useState(null);
    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await newPassword(data, token);
            setMessage(response.data);
        })
    }

    useEffect(() => {
        if (message) {
            toast({
                variant: message[2].variant,
                title: message[1].type,
                description: message[0].message,
                duration: 4000
            });

            if (message[2].variant === "") {
                redirect("sign-in");
            }
        }
    }, [message]);

    return (
        <div className="w-full">
            <Card>
                <CardHeader >
                    <CardTitle className="flex flex-col gap-4" >
                        <Button variant="ghost" size="icon" className="w-1/3 flex justify-start items-center border-b-2 border-transparent hover:border-indigo-500 duration-300 ease-in-out">
                            <Link href={"sign-in"} className="flex items-center">
                                <ChevronLeft className="h-6 w-6 mr-2" />
                                Return
                            </Link>
                        </Button>
                        <span className="text-4xl text-center font-semibold text-wrap">Enter a new Password</span>
                    </CardTitle>
                </CardHeader>
                <div className="flex items-center justify-center text-xs uppercase mb-4">
                    <hr className="flex-grow border-indigo-400 border-b-2 mx-2 rounded-md" />
                </div>
                <CardContent className="pt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                            <Button type="submit" disabled={isPending} className={`border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full `}>{isPending ? "Updating password" : "Reset Password"}</Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
        </div>
    )
}