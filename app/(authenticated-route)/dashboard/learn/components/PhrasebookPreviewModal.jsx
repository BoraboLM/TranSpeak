"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Modal from "./Modal";

export default function PhrasebookPreviewModal({ isOpen, handleCloseModal, formData, form, isPending, onSubmit }) {
    return (
        <Modal isOpen={isOpen} formData={formData} >
            {(data) => (
                <>
                    <h1 className="text-2xl font-bold mb-4">Phrasebook Preview</h1>
                    <span className="text-xl tracking-wide text-gray-600 p-2 font-[600]">Category - {data.title}</span>
                    <table className=" sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full justify-center items-center">
                        <thead>
                            <tr className="bg-gray-300 justify-between items-center">
                                <th className="py-4 text-left text-lg font-[700] text-gray-500 uppercase tracking-wider w-[50%]">{data.sourceLanguage}</th>
                                <th className="py-4 text-left text-lg font-[700] text-gray-500 uppercase tracking-wider w-[50%]">{data.targetLanguage}</th>
                            </tr>
                        </thead>
                        <tbody className="border-2">
                            <tr className="rounded-xl bg-white border-b-2 border-separate gap-2">
                                <td className="px-4 py-4 text-wrap">
                                    <div className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-900 w-[50%]">{data.english_word}</div>
                                </td>
                                <td className="px-4 py-4 text-wrap">
                                    <div className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-gray-900 text-wrap w-[50%]">{data.target_word}</div>
                                    <div className="text-sm italic text-gray-500 text-wrap">{data.pronounciation}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 w-full gap-2 flex flex-row items-center justify-center">
                        <Button
                            onClick={handleCloseModal}
                            className="w-[50%] truncate bg-red-500 hover:bg-red-700 ease-in-out duration-300"
                            disabled={isPending}
                        >
                            Close
                        </Button>

                        <Button
                            onClick={() => form.handleSubmit(onSubmit(data))}
                            className="w-[50%] truncate text-white font-[600] bg-indigo-400 hover:bg-indigo-600 ease-in-out duration-300"
                            disabled={isPending}
                        >
                            {isPending ?
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline" />
                                    Saving...
                                </>
                                : 'Save'
                            }
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    )
}