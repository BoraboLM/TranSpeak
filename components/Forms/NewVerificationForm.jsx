"use client";

import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { newVerification } from "@/app/action/new-verification";

export default function NewVerificationForm() {
    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)

    const token = useSearchParams().get('token')

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("No token found!")
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("An error occurred!")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-col gap-4" >
                        <span className="xl:text-2xl lg:text-4xl md:text-2xl sm:text-xl font-[500px] text-wrap p-6 text-center border-b-[4px] border-indigo-500"> Confirming your Verification</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!error && !success ? (
                        <div className="w-full flex justify-center items-center py-8">
                            <BeatLoader color="indigo" size={32} />
                        </div>
                    ) : (
                        <>
                            {error && !success && (
                                <div className="w-full p-4 bg-red-400 rounded-sm mt-4">
                                    <p className="text-gray-200 text-center text-wrap">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="w-full p-4 bg-green-400 rounded-sm mt-4">
                                    <p className="text-white text-center text-wrap">{success}</p>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-center w-full min-w-[120px]">
                        <Link href="/auth/sign-in">
                            <Button variant="ghost" size="default" className="flex items-center gap-2 border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out">
                                <ChevronLeft size={20} />
                                <span>Go back to Sign in</span>
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}