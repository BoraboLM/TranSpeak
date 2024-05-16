"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

export default function SelectLanguage({ control, name, label, options, isPending }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg font-[500px] cursor-pointer justify-center">{label}:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                        <FormControl>
                            <SelectTrigger className="border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out w-full justify-between">
                                <SelectValue placeholder={`Select a ${label}`} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option, index) => (
                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}