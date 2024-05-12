import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Content({ title, description, url, count }) {
    return (
        <div className="flex flex-col bg-indigo-400 px-4 py-4 border-2 border-indigo-100 rounded-xl h-[350px] hover:shadow-2xl hover:bg-indigo-500 transition-all duration-300 ease-in-out">
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-white tracking-[2px] md:tracking-[2px] text-[45px] sm:text-[30px] md:text-[35px] lg:text-[45px] xl:text-[45px] font-bold cursor-default">{title}</h1>
                <span className="cursor-default text-lg text-muted font-[600] tracking-wide">{description}</span>
            </div>

            <div className="w-full h-[40px] flex justify-center items-center">
                {count ?
                    <span className="text-[18px] text-center text-white tracking-wider">
                        Total Learning Modules: {count}
                    </span>
                    :
                    <span className="text-[18px] text-center text-white tracking-wider">
                        Currently no Modules Available
                    </span>
                }
            </div>

            <div className="w-full flex justify-center items-center py-8 relative">
                <Button className='w-[40%] bg-blue-400 text-white tracking-wider font-semibold hover:text-black hover:bg-blue-400/90 transition-colors duration-200 rounded-lg shadow-md' disabled={count === 0}>
                    <Link href={`/${url}`} className="h-full w-full">Learn Now</Link>
                </Button>
            </div>
        </div>
    )
}