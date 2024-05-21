'use client';

import Modal from "./Modal";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/Reusable/FormInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhrasebookTextarea from "@/components/Reusable/Textarea";
import { FooterPhrasebookFormSchema } from "./FooterPhrasebookSchema";
import { CircleX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { UpdatePhrasebook } from "@/app/action/Learn/update-phrasebook";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

export default function PhrasebookFooterModal({ isOpen, formData, handleCloseFooterModal }) {
    const session = useSession();
    const [dataStatus, setDataStatus] = useState(formData.status === 'ACTIVE' ? 'ACTIVE' : 'DISABLED');
    const [message, setMessage] = useState(null);
    const [isPending, startTransition] = useTransition();

    const defaultFormData = {
        language: '',
        title: '',
        sourceLanguage: '',
        english_word: '',
        targetLanguage: '',
        target_word: '',
        pronounciation: '',
        status: '',
        ...formData
    };

    const form = useForm({
        resolver: zodResolver(FooterPhrasebookFormSchema),
        defaultValues: defaultFormData
    });

    useEffect(() => {
        form.reset(defaultFormData);
        setDataStatus(formData.status === 'ACTIVE' ? 'ACTIVE' : 'DISABLED');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, form]);

    const onSubmit = async (data) => {
        data.status = dataStatus;
        const userId = session.data.user.id;
        const userName = session.data.user.name;
        const _data = {
            id: formData.id,
            ...data,
        }

        startTransition(async () => {
            const response = await UpdatePhrasebook(_data, userId, userName);
            setMessage(response.data)
        })
    }

    const handleToggle = () => {
        setDataStatus(prevStatus => prevStatus === 'ACTIVE' ? 'DISABLED' : 'ACTIVE');
    };

    useEffect(() => {
        if (message) {
            toast({
                variant: message[2].variant,
                title: message[1].type,
                description: message[0].message,
                duration: 4000
            });
            handleCloseFooterModal();
            setMessage(null);
        }
    }, [message, handleCloseFooterModal]);
    return (
        <Modal isOpen={isOpen} formData={formData}>
            {(data) => {
                const formattedDate = new Date(data.createdAt).toLocaleDateString();
                const formattedTime = new Date(data.createdAt).toLocaleTimeString('fil-PH', { hour: '2-digit', minute: '2-digit' });
                return (
                    <div className="p-6 w-full h-full overflow-hidden">
                        <div className="flex justify-between items-center h-[30px] pb-4">
                            <h1 className="text-xl text-gray-800 font-bold tracking-wider">
                                {data.user.name} - {formattedDate}
                                <span className="text-md"> ({formattedTime}) </span>
                            </h1>
                            <button onClick={handleCloseFooterModal} className="mt-1 mr-2">
                                <CircleX className="h-6 w-6 hover:fill-indigo-400 ease-in-out" />
                            </button>
                        </div>

                        <div className="p-6 bg-white shadow-md rounded-b-lg w-full max-h-[70vh] overflow-y-auto">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                                    <div className={`w-full h-[50px] rounded-t-lg flex items-center justify-between px-4 ${dataStatus === 'ACTIVE' ? 'bg-green-300' : 'bg-red-300'} ease-in-out duration-300`}>
                                        <span className="text-gray-800 font-semibold tracking-wider">
                                            STATUS: {dataStatus}
                                        </span>

                                        <Switch
                                            checked={dataStatus === 'ACTIVE'}
                                            onCheckedChange={handleToggle}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput
                                            name="language"
                                            label="Language"
                                            type="text"
                                            control={form.control}
                                            isPending={isPending}
                                        />
                                        <FormInput
                                            name="title"
                                            label="Category"
                                            type="text"
                                            control={form.control}
                                            isPending={isPending}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput
                                            name="sourceLanguage"
                                            label="English"
                                            type="text"
                                            control={form.control}
                                            isPending={isPending}
                                        />
                                        <FormInput
                                            name="english_word"
                                            label="English Word"
                                            type="text"
                                            control={form.control}
                                            isPending={isPending}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput
                                            name="targetLanguage"
                                            label="Target Language"
                                            type="text"
                                            control={form.control}
                                            isPending={isPending}
                                        />
                                        <FormInput
                                            name="target_word"
                                            label="Target Word"
                                            type="text"
                                            control={form.control}
                                            isPending={isPending}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <PhrasebookTextarea
                                            control={form.control}
                                            name="pronounciation"
                                            label="Pronounciation"
                                            isPending={isPending}
                                        />
                                    </div>

                                    <div className="flex w-full justify-center">
                                        <Button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg w-full"
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <>
                                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline" />
                                                    Updating Phrasebook...
                                                </>
                                            ) : (
                                                <>
                                                    Update Phrasebook
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                );
            }}
        </Modal>
    );
}
