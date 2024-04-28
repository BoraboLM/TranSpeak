"use client";

import { toast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";

export default function useSpeechToText(options) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            toast({
                title: "Browser not supported",
                message: "Speech recognition is not supported in this browser. Please try again in Chrome or Edge.",
                variant: "destructive",
            })
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition() || window.SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.interimResults = options.interimResults || true;
        // en-US
        recognition.language = options.lang || "fil-PH";
        recognition.continuous = options.continuous || false;

        if ("webkitSpeechGrammarList" in window) {
            const grammar = "#JSGF V1.0; grammar panctuation; public <punct> = . | , | ? | ! | ; | : ";
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        recognition.onresult = (event) => {
            let text = "";
            for (let i = 0; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    text += event.results[i][0].transcript;
                }
            }
            setTranscript(text);
        };


        recognition.onerror = (event) => {
            toast({
                title: "Speech Recognition error",
                description: "An error occurred while trying to recognize your speech. Please try again.",
                variant: "destructive",
            })
            console.error("Speech Recognition error. ", event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
            setTranscript("");
        };

        return () => {
            recognition.stop();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return { isListening, transcript, startListening, stopListening };
}


