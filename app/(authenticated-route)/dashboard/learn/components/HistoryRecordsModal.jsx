"use client";

import { Button } from "@/components/ui/button";
import Modal from "./Modal";

export default function HistoryRecordsModal({ isOpen, formData, handleCloseModal }) {
    return (
        <Modal isOpen={isOpen} formData={formData}>
            {(data) => {
                const formattendDate = new Date(data.createdAt);
                const formattedDate = formattendDate.toLocaleDateString();
                const formattedTime = formattendDate.toLocaleTimeString('fil-PH', { hour: '2-digit', minute: '2-digit' });
                return (
                    <>
                        <div className="w-full gap-4 py-2">
                            <h1 className="text-xl tracking-wide font-[600] px-4 py-2 text-gray-500"><em className="tracking-widest font-[600] text-2xl">{data.user.name}</em> - {formattedTime} {formattedDate}</h1>

                            <div className="flex flex-col w-full h-full p-4 gap-4 rounded-xl bg-indigo-200/60 ">
                                <h1 className="text-xl tracking-wide font-semibold text-gray-800 truncate">
                                    Phrase ID:
                                    <span className="text-lg text-gray-600 font-medium ml-2 cursor-pointer hover:underline underline-offset-[6px]" onClick={() => navigator.clipboard.writeText(data.id)}>
                                        {data.id}
                                    </span>
                                </h1>

                                <div className="flex flex-col justify-center items-start py-4">
                                    <h1 className="text-slate-950 text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-[600] tracking-wide text-wrap">
                                        Category - {data.title}
                                    </h1>
                                </div>

                                <div className="flex flex-col justify-center items-start">
                                    <h1 className="text-slate-950 text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-[600] tracking-wide text-wrap">
                                        {data.sourceLanguage}
                                    </h1>
                                    <span className="text-gray-500 text-md font-[500] tracking-widest">
                                        <em className="font-[600] text-lg text-wrap">Input: </em>
                                        {data.english_word}
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-start">
                                    <h1 className="text-slate-950 text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-[600] tracking-wide text-wrap">
                                        {data.targetLanguage}
                                    </h1>
                                    <span className="text-gray-500 text-md font-[500] tracking-widest text-wrap">
                                        <em className="font-[600] text-lg">Output: </em>
                                        {data.target_word}
                                    </span>

                                    <span className="text-gray-500 text-md font-[500] tracking-widest italic text-wrap">
                                        <em className="font-[600] text-lg">Pronounciation: </em>
                                        {data.pronounciation}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 w-full gap-2 flex flex-row items-center justify-center">
                                <Button
                                    onClick={handleCloseModal}
                                    className="w-[60%] truncate bg-stone-800"
                                >
                                    Close History
                                </Button>
                            </div>
                        </div>

                    </>
                )
            }}
        </Modal>
    )
}