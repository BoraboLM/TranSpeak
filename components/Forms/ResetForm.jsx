"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import { resetSchema } from "./schema/resetSchema";
import { useTransition } from "react";
import { resetPassword } from "@/app/action/reset";

export default function ResetPassword() {
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(resetSchema),
        email: z
            .string()
            .min(1, { message: "Please Enter your email" })
    });

    const [message, setMessage] = useState(null);
    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await resetPassword(data);
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

            redirect("sign-in");
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
                        <span className="text-4xl text-center font-semibold text-wrap">Reset Password</span>
                    </CardTitle>
                    <CardDescription>
                        <span className="text-md text-wrap">Enter your email to receive reset password link</span>
                    </CardDescription>
                </CardHeader>
                <div className="flex items-center justify-center text-xs uppercase mb-4">
                    <hr className="flex-grow border-indigo-400 border-b-2 mx-2 rounded-md" />
                </div>
                <CardContent className="pt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                disabled={isPending}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl font-medium">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-wrap text-md" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending} className={`border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full `}>{isPending ? "Sending reset email link..." : "Send reset email"}</Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
        </div>
    )
}