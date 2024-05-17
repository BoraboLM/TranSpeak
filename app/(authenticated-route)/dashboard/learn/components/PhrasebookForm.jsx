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
import { SavePhrasebook } from "@/app/action/Learn/phrasebook";
import { toast } from "@/components/ui/use-toast";
import HistoryRecords from "./HistoryRecords";
import PhrasebookPreviewModal from "./PhrasebookPreviewModal";
import HistoryRecordsModal from "./HistoryRecordsModal";

export default function PhrasebookForm({ data, user, historyData }) {
    const categoryData = data.reduce((unique, item) => {
        return unique.some(obj => obj.value === item.title) ? unique : [...unique, { value: item.title, label: item.title }];
    }, []);

    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState(null);

    // Modal State
    const [isOpen, setIsOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);

    // Modal Data
    const [formData, setFormData] = useState({});
    const [historyFormData, setHistoryFormData] = useState({});


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                setHistoryOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [setIsOpen, setHistoryOpen])

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

    const handleOpenHistoryModal = (data) => {
        setHistoryFormData(data);
        setHistoryOpen(true);
    }

    const handleCloseHistoryModal = () => {
        setHistoryOpen(false);
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
                            <Button
                                className="border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out"
                            >
                                Create Phrasebook Data.
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            {/* History Component */}
            <HistoryRecords
                data={historyData}
                historyRecord={handleOpenHistoryModal}
            />

            <PhrasebookPreviewModal
                isOpen={isOpen}
                formData={formData}
                form={form}
                onSubmit={onSubmit}
                isPending={isPending}
                handleCloseModal={handleCloseModal}
            />

            <HistoryRecordsModal
                isOpen={historyOpen}
                formData={historyFormData}
                isPending={isPending}
                handleCloseModal={handleCloseHistoryModal}
            />

        </div>
    )
}
