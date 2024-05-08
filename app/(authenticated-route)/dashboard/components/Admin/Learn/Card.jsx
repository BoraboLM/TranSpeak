import Buttons from "./Buttons";

export default function Card({ title, description, children }) {
    return (
        <div className="w-[90%] rounded-[15px] border-2 shadow-md  mt-4 hover:border-indigo-400 transition-all ease-in-out ">
            <div className="flex border-b-2 border-b-indigo-200 hover:border-indigo-400 transition-all ease-in-out">
                <div className="flex-1 justify-start items-start">
                    <div className="flex flex-col">
                        <span className="pt-2 px-4 text-[40px] tracking-wider uppercase font-semibold text-indigo-400">{title}</span>
                        <span className="pb-2 px-4 text-sm tracking-wider uppercase font-semibold text-indigo-400">{description}</span>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-full flex justify-end items-center px-6">
                        <Buttons />
                    </div>
                </div>
            </div>
            <div className="w-full h-[250px] grid grid-cols-1 p-3">
                {children}
            </div>
        </div>
    )
}