"use client";

import Link from "next/link";

export default function FooterPhrasebook({ data, footerData }) {
    const phrasebookData = data.slice(0, 6);
    return (
        <div className="flex flex-col md:flex-row h-full w-full gap-4 px-4">
            <div className="flex flex-col gap-4 p-4 flex-1 bg-gray-200 rounded-lg sm:w-full md:w-full">
                <h1 className="text-2xl font-[900] text-gray-800 tracking-widest">Phrasebook Data.</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {phrasebookData.map((item, index) => (
                        <div
                            onClick={() => footerData(item)}
                            key={index}
                            className="rounded-lg shadow relative p-4 bg-white cursor-pointer hover:shadow-2xl hover:bg-gradient-to-b from-indigo-50 to-indigo-100 transition duration-300 ease-in-out"
                        >
                            <div className="flex justify-between items-center border-b-2">
                                <span className="text-md font-[600] text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString()} - {new Date(item.createdAt).toLocaleTimeString('fil-PH', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <div className={`flex justify-center items-center text-white text-sm font-bold px-3 py-1 rounded-full ${item.status === 'ACTIVE' ? 'bg-green-400' : 'bg-red-400'} mb-1`}>
                                    <span className="text-md font-[600]">{item.status}</span>
                                </div>
                            </div>
                            <h1 className="text-lg font-[700] text-gray-800 tracking-wider truncate">{item.title}</h1>
                            <p className="text-lg font-[400] text-gray-600 truncate">{item.language}</p>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-[400] text-gray-500 truncate">{item.sourceLanguage}: {item.english_word}</span>
                                <span className="text-sm font-[400] text-gray-500 truncate">{item.targetLanguage}: {item.target_word}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex w-full h-full justify-center items-center py-4">
                    <Link href={'/dashboard/learn/phrasebook'} replace className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" target={'_blank'}>
                        <h1 className="text-muted-foreground font-[600] tracking-wide">Click here to see all Phrasebook Data</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
}
