"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { translateSchema } from './schema/translateSchema';
import { Textarea } from '@/components/ui/textarea';
import { useState, useTransition, useEffect } from "react";

// Importing the icons
import { Mic } from 'lucide-react';
import { MicOff } from 'lucide-react';
import { Volume2 } from 'lucide-react';
import { Copy } from 'lucide-react';
import { input, target } from "./data/input";

// custom Hooks
import useSpeechToText from "@/app/hooks/useSpeechToText";
import useTextToSpeech from "@/app/hooks/useTextToSpeech";

// Server Actions
import { Translate } from "@/app/action/translate";
import LanguageSelect from "./LanguageSelect";
import AnimatedText from "./AnimatedResponse";

export default function TranslationForm() {
    const [isCopied, setIsCopied] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [timeoutId, setTimeoutId] = useState(null); // Add state for timeout
    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true, lang: 'en-US' });

    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening();
    };

    const stopVoiceInput = () => {
        setTextInput(prevTextInput => {
            const newText = transcript.length ? (prevTextInput ? ' ' : '') + transcript : '';
            return prevTextInput + newText;
        });
        stopListening();
    };

    const [source_value, setSourceValue] = useState('')
    const [targetValue, setTargetValue] = useState("")
    const [response, setResponse] = useState({ translation: "" })
    const [isTranslating, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(translateSchema),
        defaultValues: {
            source: '',
            target: '',
            input: '',
        }
    })

    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await Translate(data, textInput);
            setResponse(response);
        })
    }

    // text to speech function
    const Speak = ({ translation, lang }) => {
        useTextToSpeech(translation, lang);
    }

    // const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     setTextInput(value);

    //     // if the textarea is empty it will do nothing
    //     if (value === '') return

    //     if (timeoutId) {
    //         clearTimeout(timeoutId);
    //     }

    //     const newTimeoutId = setTimeout(() => {
    //         form.handleSubmit(onSubmit)();
    //     }, 1500);

    //     setTimeoutId(newTimeoutId);
    // }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTextInput(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    useEffect(() => {
        if (textInput === '') return;

        const newTimeoutId = setTimeout(() => {
            form.handleSubmit(onSubmit)();
        }, 1500);

        setTimeoutId(newTimeoutId);

        return () => {
            if (newTimeoutId) {
                clearTimeout(newTimeoutId);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textInput]);

    useEffect(() => {
        if (!isListening && transcript) {
            form.handleSubmit(onSubmit)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening, transcript]);
    return (
        <>
            <div className="w-full px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                            <div>
                                <Card className="w-[80vw] sm:w-[60vw] md:w-[60vw] lg:w-[35vw] xl:w-[30vw] 2xl:w-[30vw] shadow-xl">
                                    <div>
                                        <CardHeader>
                                            <LanguageSelect
                                                name={"source"}
                                                control={form.control}
                                                source_value={source_value}
                                                setSourceValue={setSourceValue}
                                                lang={input}
                                            />
                                        </CardHeader>
                                    </div>

                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="input"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter text to translate..."
                                                            className="resize-none shadow-xl"
                                                            {...field}
                                                            disabled={isListening}
                                                            height="300px"
                                                            spellCheck="false"
                                                            onChange={handleInputChange}
                                                            value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            className="flex justify-start py-4 mt-2"
                                            disabled={source_value !== "English" && source_value !== "Filipino"}
                                            type="button"
                                            variant="ghost"
                                            onClick={() => { startStopListening() }}>
                                            {isListening ? <><MicOff className="h-6 w-6 mr-2 text-red-500" />Stop</> : <><Mic className="h-6 w-6 mr-2 text-blue-500" /> Open Microphone </>}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <Card className="w-[80vw] sm:w-[60vw] md:w-[60vw] lg:w-[35vw] xl:w-[30vw] 2xl:w-[30vw]  shadow-xl">
                                    <div>
                                        <CardHeader>
                                            <LanguageSelect
                                                name={"target"}
                                                control={form.control}
                                                source_value={targetValue}
                                                setSourceValue={setTargetValue}
                                                lang={target}
                                            />
                                        </CardHeader>
                                    </div>
                                    <CardContent>
                                        {/* Translated Output but in Different component because i added something like gpt response animation */}
                                        <AnimatedText
                                            response={response.translation.translation_text}
                                            name={"output"}
                                            form={form.control}
                                            input={response.translation.user_input}
                                        />

                                        <div className="flex flex-row justify-start">
                                            <Button
                                                className="flex justify-start py-4 mt-2"
                                                type="button"
                                                disabled={response.translation.target !== "English" && response.translation.target !== "Filipino"}
                                                variant="ghost"
                                                onClick={() => { Speak({ translation: response.translation.translation_text, lang: response.translation.target }) }}>
                                                <Volume2 className="h-6 w-6 mr-2 text-blue-500" /> Play Translation
                                            </Button>
                                            <Button
                                                className="flex justify-start py-4 mt-2"
                                                disabled={!response.translation.translation_text}
                                                variant="ghost"
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(response.translation.translation_text)
                                                    setIsCopied(true);
                                                    setTimeout(() => setIsCopied(false), 3000);
                                                }}
                                            >
                                                <Copy className="h-6 w-6 mr-2 text-blue-500" /> {isCopied ? <p>Text copied!</p> : <p className="text-wrap">Copy Translation</p>}
                                            </Button>
                                        </div>

                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* <div className="flex gap-4 mt-6 w-full px-10  justify-center">
                            <Button type="submit" className=" w-[40vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[30vw] 2xl:w-[30vw] border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out" disabled={isListening || isTranslating}>
                                {isTranslating ? "Translating..." : "Translate"}
                            </Button>
                        </div> */}
                    </form>
                </Form>
            </div >
        </>
    )
}
