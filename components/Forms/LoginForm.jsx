"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useFormState } from "react-dom"
import { Signin } from "@/app/action/login-in";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"

import Link from "next/link"

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
        </Button>
    )
}

export default function LoginForm() {
    const searchParams = useSearchParams();

    // Check if the error is OAuthAccountNotLinked
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "This account is already linked with different provider.🤨🤨🤨" : null;

    const onClick = () => {
        signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }

    const [state, formAction] = useFormState(Signin, undefined);
    return (
        <div className="w-full max-w-[450px]">
            <Card >
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-wrap md:text-4xl text-center">
                        <span>Sign in to Trans-Speak</span>
                    </CardTitle>
                    <CardDescription className="text-lg text-center">
                        {state && state?.twoFactor ? "Enter the OTP code sent to your email" : "Enter your Credentials to continue"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="gap-2">
                        <div className="grid gap-4">
                            {(state?.error || state?.success) && (
                                <div className={`w-full p-4 rounded-sm mt-4 ${state.success ? 'bg-green-400' : 'bg-red-400'}`}>
                                    <p className="text-white text-center">{state.error || state.success}</p>
                                </div>
                            )}

                            {urlError && (
                                <div className="w-full p-4 bg-red-400 rounded-sm mt-4">
                                    <p className="text-gray-200 text-center text-wrap">{urlError}</p>
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-lg font-[500px] cursor-pointer justify-center">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@gmail.com"
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-lg font-[500px] cursor-pointer justify-center">Password</Label>
                                    <Link href="/auth/reset" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Submit />
                            </div>

                        </div>
                    </form>
                </CardContent>
                {/* if login with email added, add mb-4 to this div */}
                <div className="flex items-center justify-center text-xs uppercase">
                    <hr className="flex-grow border-gray-400 mx-2" />
                    <span className="px-2 text-muted-foreground">
                        Or continue with
                    </span>
                    <hr className="flex-grow border-gray-400 mx-2" />
                </div>
                <CardFooter className="flex flex-col">

                    {/* Add this back if they wanted to kekw */}
                    {/* <Button variant="secondary" className="w-full hover:bg-blue-300 ease-in-out duration-300">
                        <Link href={'email'} className="flex items-center"><Mail className="mr-[16px] size-[24px]" /> Login with Email  </Link>
                    </Button> */}

                    <Button variant="outline" className="w-full mt-4" onClick={() => onClick()}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" className="mr-4">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg> Continue with Google
                    </Button>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="sign-up" className="underline hover:decoration-blue-400 ease-in-out duration-300">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}