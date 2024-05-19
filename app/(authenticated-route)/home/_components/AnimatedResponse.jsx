import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function AnimatedText({ response, form, name, input }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentText, setCurrentText] = useState(response);
    const [userInput, setUserInput] = useState(input);

    useEffect(() => {
        setCurrentText(response);
    }, [response]);

    useEffect(() => {
        setUserInput(input)
    }, [input])

    useEffect(() => {
        if (userInput) {
            const regexPattern = userInput.trim().replace(/\s+/g, '\\s*').replace(/\?/g, '\\?') + '\\s*\\??';
            const regex = new RegExp(regexPattern, 'gi');
            const output = currentText.replace(regex, '').trim();

            if (output) {
                let displayedTextBuilder = '';

                for (let i = 0; i < output.length; i++) {
                    setTimeout(() => {
                        displayedTextBuilder += output.charAt(i);
                        setDisplayedText(displayedTextBuilder);
                    }, i * 30);
                }
            }
        }
    }, [currentText, userInput]);

    return (
        <FormField control={form} name={name} render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Textarea
                        placeholder="Translated text will appear here..."
                        className="resize-none shadow-md"
                        {...field}
                        height="300px"
                        disabled
                        spellCheck="false"
                        value={displayedText}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    );
}
