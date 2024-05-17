"use client";
import FormInput from "@/components/Reusable/FormInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PhrasebookFormSchema } from "./PhrasebookFormSchema";
import SelectLanguage from "@/components/Reusable/SelectLanguage";
import { Button } from "@/components/ui/button";
import SelectOption from "./SelectOptions";
import PhrasebookTextarea from "@/components/Reusable/Textarea";
import Modal from "./Modal";
import { SavePhrasebook } from "@/app/action/Learn/phrasebook";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function PhrasebookForm({ data, user }) {
    const categoryData = data.reduce((unique, item) => {
        return unique.some(obj => obj.value === item.title) ? unique : [...unique, { value: item.title, label: item.title }];
    }, []);

    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [setIsOpen])

    const form = useForm({
        resolver: zodResolver(PhrasebookFormSchema),
        defaultValues: {
            sourceLanguage: "",
            targetLanguage: "",
            language: "",
            title: "",
            english_word: "",
            target_word: "",
            pronounciation: ""
        }
    })

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const previewData = async (data) => {
        setFormData(data);
        setIsOpen(true);
    }

    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await SavePhrasebook(data, user);
            setMessage(response);
        })
    }

    useEffect(() => {
        if (message) {
            toast({
                variant: message.data[2].variant,
                title: message.data[1].type,
                description: message.data[0].message,
                duration: 4000
            });
        }
        setIsOpen(false);

    }, [message, setIsOpen]);

    return (
        <div className="flex flex-col md:flex-row h-full w-full gap-4 px-4">
            <div className="flex flex-col gap-4 p-4 flex-1 md:flex-[2.5] bg-gray-200 rounded-lg sm:w-full md:w-full">
                <h1 className="w-full text-2xl tracking-wider font-[700]">Create a Phrasebook Data</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(previewData)} className="gap-4 px-4">
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <SelectLanguage
                                control={form.control}
                                name={"language"}
                                label={"Language"}
                                options={[
                                    { value: "ILOCANO", label: "Ilocano" },
                                    { value: "PANGASINAN", label: "Pangasinan" },
                                ]} isPending={isPending}
                            />

                            <SelectOption
                                categoryData={categoryData}
                                formControl={form.control}
                                isPending={isPending}
                                form={form}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4">
                            <SelectLanguage
                                control={form.control}
                                name={"sourceLanguage"}
                                label={"English"}
                                options={[
                                    { value: "ENGLISH", label: "ENGLISH" },
                                ]}
                                isPending={isPending}
                            />

                            <FormInput
                                control={form.control}
                                isPending={isPending}
                                name={"english_word"}
                                label={"English Word"}
                                type={"text"}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4">
                            <SelectLanguage
                                control={form.control}
                                name={"targetLanguage"}
                                label={"Target Language"}
                                options={[
                                    { value: "PANGASINAN", label: "PANGASINAN" },
                                    { value: "ILOCANO", label: "ILOCANO" }
                                ]}
                                isPending={isPending}
                            />

                            <FormInput
                                control={form.control}
                                isPending={isPending}
                                name={"target_word"}
                                label={"Target Word"}
                                type={"text"}
                            />
                        </div>

                        <div className="w-full gap-2 p-2">
                            <PhrasebookTextarea
                                control={form.control}
                                name={"pronounciation"}
                                label={"Pronounciation"}
                                isPending={isPending}
                            />
                        </div>

                        <div className="p-2 mt-2">
                            <Button className="border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out">Create Phrasebook Data.</Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="flex-1 md:flex-[1.5]">
                <div className="w-full h-full bg-gray-200 rounded-xl p-4">
                    <h1>Hello</h1>
                </div>
            </div>

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
                                // form.handleSubmit(previewData)
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
        </div>
    )
}
