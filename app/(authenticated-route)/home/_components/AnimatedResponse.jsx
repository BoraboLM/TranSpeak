import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function AnimatedText({ response, form, name }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentText, setCurrentText] = useState(response);

    useEffect(() => {
        setCurrentText(response);
    }, [response]);

    useEffect(() => {
        if (currentText) {
            let displayedTextBuilder = '';

            for (let i = 0; i < currentText.length; i++) {
                setTimeout(() => {
                    displayedTextBuilder += currentText.charAt(i);
                    setDisplayedText(displayedTextBuilder);
                }, i * 30);
            }
        }
    }, [currentText]);

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
