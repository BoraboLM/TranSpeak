"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleX } from 'lucide-react';

export default function EditUserModal({ user, onClose }) {
    console.log(user)
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 backdrop-blur-[2px] z-10 overscroll-none">
            <div className="h-[600px] w-[500px] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px] ">
                <div className="w-full h-full bg-white rounded-lg  p-4">
                    {/* Close Button of the modal */}
                    <div className="w-full h-[30px]">
                        <button onClick={onClose} className="float-right mt-1 mr-2">
                            <CircleX className="h-6 w-6 hover:fill-indigo-400 ease-in-out" />
                        </button>
                    </div>
                    {/* Header of the Form */}
                    <div className='w-full h-[40px]'>
                        <span className='flex justify-center items-center text-xl font-semibold tracking-wider text-center'>Edit User Profile</span>
                    </div>
                    {/* User Information */}
                    <div className='grid '>
                        <div className='grid grid-rows-2'>
                            <div className='grid'>
                                <Label>Name: </Label>
                                <Input value={user.name} />
                            </div>
                            <div className='flex justify-between items-center'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}