"use client";

import { Input } from '@/components/ui/input';
import { CircleX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { EditProfileSchema } from './Schema/EditUserProfileSchema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import UpdateUser from '@/app/action/UpdateUser';


export default function EditUserModal({ user, onClose }) {
    const [message, setMessage] = useState(null);
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            nationality: user.nationality,
            role: user.role,
        }
    })

    // Close the modal on pressing the escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onSubmit = async (data) => {
        // Binds the user id to the data object
        const _data = {
            id: user.id,
            ...data,
        };

        const origData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            nationality: user.nationality,
            role: user.role,
        }

        startTransition(async () => {
            const response = await UpdateUser(_data, origData);
            setMessage(response)
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 backdrop-blur-[2px] z-10 overflow-hidden ">
            <div className="h-[700px] w-[500px] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px] ">
                <div className="w-full h-full bg-indigo-100 rounded-lg  p-4">

                    {/* Close Button of the modal */}
                    <div className="w-full h-[30px]">
                        <button onClick={onClose} className="float-right mt-1 mr-2">
                            <CircleX className="h-6 w-6 hover:fill-indigo-400 ease-in-out" />
                        </button>
                    </div>

                    {/* Header of the Form */}

                    <div className='w-full h-[40px] mb-4 rounded-lg'>
                        <span className='flex justify-center items-center text-xl font-semibold tracking-wider text-center '>Edit {`${user.name}'s`} Profile</span>
                    </div>

                    {/* Error message */}
                    <div className="w-full mb-2">
                        {message && message.error &&
                            <div className="bg-red-500  text-white p-2 text-center text-wrap rounded-md">
                                <span className='text-lg'>
                                    {message.error}
                                </span>
                            </div>}

                        {message && message.success &&
                            <div className="bg-green-400 text-white p-2 flex flex-col text-center text-wrap rounded-md">
                                <span className="text-lg font-[500] tracking-wide">
                                    {message.success}
                                </span>
                            </div>}
                    </div>

                    {/* User Information */}
                    <div className='grid '>
                        <div className='grid grid-rows-2'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className='grid grid-2 gap-4'>

                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[18px] tracking-wide">First Name:</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="First Name" {...field} disabled={isPending} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[18px] tracking-wide">Last Name:</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Last Name" {...field} disabled={isPending} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="nationality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[18px] tracking-wide">Nationality:</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nationality" {...field} disabled={isPending} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[18px] tracking-wide">Role:</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={user.role} >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={user.role} disabled={isPending} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                                                            <SelectItem value="USER">USER</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[18px] tracking-wide">Account Status:</FormLabel>
                                                    <FormDescription className="text-sm text-red-500">Note: Will be added sooner or later 😂</FormDescription>
                                                    <Select onValueChange={field.onChange} defaultValue="ACTIVE" disabled={true}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="ACTIVE" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                                            <SelectItem value="DISABLED">DISABLED</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Buttons for Cancel and Update */}
                                        <div className='w-full flex items-center justify-center mt-2'>
                                            <div className='flex flex-row gap-4 items-center justify-center flex-grow'>
                                                <Button type="button" onClick={onClose} className="w-[50%] h-10 bg-red-500 hover:bg-red-400 text-white tracking-wide">
                                                    Cancel
                                                </Button>

                                                <Button
                                                    disabled={isPending}
                                                    type="submit"
                                                    className="w-[60%] h-10 bg-blue-500 hover:bg-blue-400 text-sm text-[#ffffff]  tracking-wider">
                                                    {isPending ? "Updating..." : "Update User"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}