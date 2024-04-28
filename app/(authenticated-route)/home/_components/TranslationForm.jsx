"use client";

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { translateSchema } from './schema/translateSchema';
import { Textarea } from '@/components/ui/textarea';
import { languages } from "./data/languages";
import { useState, useTransition, useEffect } from "react";

// Importing the icons
import { Mic } from 'lucide-react';
import { MicOff } from 'lucide-react';
import { Volume2 } from 'lucide-react';

// custom Hooks
import useSpeechToText from "@/app/hooks/useSpeechToText";
import useTextToSpeech from "@/app/hooks/useTextToSpeech";

// Server Actions
import { Translate } from "@/app/action/translate";

export default function TranslationForm() {
    const [textInput, setTextInput] = useState('');
    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true, lang: 'fil-PH' });


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


    const [sourceOpen, setSourceOpen] = useState(false)
    const [targetOpen, setTargetOpen] = useState(false)
    const [sourceValue, setSourceValue] = useState("")
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
                                            <FormField
                                                control={form.control}
                                                name="source"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Popover open={sourceOpen} onOpenChange={setSourceOpen}>
                                                            <PopoverTrigger asChild>

                                                                <Button
                                                                    {...field}
                                                                    className="border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between"
                                                                    variant="secondary"
                                                                    aria-expanded={sourceOpen}
                                                                >
                                                                    <FormControl  >
                                                                        <span className="text-[16px]">
                                                                            {sourceValue
                                                                                ? languages.find((language) => language.value === sourceValue)?.label
                                                                                : "Select source Language..."}
                                                                        </span>

                                                                    </FormControl>
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>

                                                            <PopoverContent className="w-full p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search Lanugae..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>No Language found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {languages.map((language, key) => (
                                                                                <CommandItem
                                                                                    key={key}
                                                                                    sourceValue={language.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setSourceValue(currentValue === sourceValue ? "" : currentValue)
                                                                                        setSourceOpen(false)
                                                                                        field.onChange(currentValue === sourceValue ? "" : currentValue);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            sourceValue === language.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                    {language.label}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>

                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardHeader>
                                    </div>


                                    {/* 
                                    STILL NEED TO FIX THE TEXTAREA TO IN ORDER TO VALIDATE THE INPUT
                                    CURRENTLY IT IS NOT DETECTING THE INPUT VALUE BASED ON THE TEXTAREA ONLY EVEN THOUGH THE TEXTAREA HAS A VALUE
                                    */}
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
                                                            onChange={(e) => { setTextInput(e.target.value) }}
                                                            value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            className="flex justify-start py-4 mt-2"
                                            disabled={sourceValue !== "English" && sourceValue !== "Tagalog"}
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
                                            <FormField
                                                control={form.control}
                                                name="target"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Popover open={targetOpen} onOpenChange={setTargetOpen}>
                                                            <PopoverTrigger asChild>

                                                                <Button
                                                                    {...field}
                                                                    className="border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between"
                                                                    variant="secondary"
                                                                    aria-expanded={targetOpen}
                                                                >
                                                                    <FormControl  >
                                                                        <span className="text-[16px]">
                                                                            {targetValue
                                                                                ? languages.find((language) => language.value === targetValue)?.label
                                                                                : "Select target Language..."}
                                                                        </span>

                                                                    </FormControl>
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>

                                                            <PopoverContent className="w-full p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search Lanugae..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>No Language found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {languages.map((language, key) => (
                                                                                <CommandItem
                                                                                    key={key}
                                                                                    sourceValue={language.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        setTargetValue(currentValue === targetValue ? "" : currentValue)
                                                                                        setTargetOpen(false)
                                                                                        field.onChange(currentValue === targetValue ? "" : currentValue);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            targetValue === language.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                    {language.label}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardHeader>
                                    </div>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="output"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Translated text will appear here..."
                                                            className="resize-none shadow-md"
                                                            {...field}
                                                            disabled
                                                            value={response.translation}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            className="flex justify-start py-4 mt-2"
                                            type="button"
                                            disabled={response.target !== "English" && response.target !== "Tagalog"}
                                            variant="ghost"
                                            onClick={() => { Speak({ translation: response.translation, lang: response.target }) }}>
                                            <Volume2 className="h-6 w-6 mr-2 text-blue-500" /> Play Translation
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6 w-full px-10  justify-center">
                            <Button type="submit" className=" w-[40vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[30vw] 2xl:w-[30vw] border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out" disabled={isListening || isTranslating}>
                                {isTranslating ? "Translating..." : "Translate"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}