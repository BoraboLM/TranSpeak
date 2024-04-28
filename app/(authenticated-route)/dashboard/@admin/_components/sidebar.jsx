"use client";
import { useCurrentUser } from '@/app/hooks/use-current-user';
import { LayoutDashboard } from 'lucide-react';
import { data } from './data/data';

export default function Sidebar() {
    const session = useCurrentUser();
    return (
        <div className="flex flex-col">
            <div className="flex text-center flex-1 flex-col items-center border-b-2 border-mute p-10">
                <span className="text-2xl sm:text-md md:text-[18px] xl:text-2xl 2xl:text-2xl font-[700] tracking-wide flex flex-row justify-center items-center gap-2 whitespace-nowrap ">
                    Admin Dashboard
                </span>
                <span className='font-semibold text-[14px] whitespace-nowrap'>Hi, {session.name}!</span>
            </div>
            <div className="flex-1 flex-col justify-center items-center py-6">
                {data.map((item, index) => (
                    <span key={index} className='flex items-center justify-start text-lg tracking-wider py-4 px-4 cursor-pointer font-[500] hover:bg-indigo-300 hover:fill-white'>
                        {item.icon}
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    )
}