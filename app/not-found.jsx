import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'


export const metadata = {
    title: "Not Found",
}

export default async function NotFound() {
    return (
        <div className='h-screen w-screen flex items-center justify-center content-center flex-col gap-4 bg-[#000] z-10'>
            <Image src={'/404 NotFound.png'} width={500} height={500} alt='404' priority draggable="false" />
            <Image src={'/confused.gif'} alt='NotFound' width={868} height={426} priority className=' px-6' unoptimized draggable="false" />
            <p className='text-lg md:text-[20px] xl:text-lg  to-muted text-indigo-300 py-5'>Could not find requested resource</p>
            <p className='mt-2'>
                <Button className="xl:w-[180px] border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out" variant="secondary">
                    <Link href={"/home"}><span className='text-wrap text-xl text-indigo-500'>Return Home</span></Link>
                </Button>
            </p>
        </div>
    )
}