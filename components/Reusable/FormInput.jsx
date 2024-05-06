"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export default function FormInput({ control, isPending, name, label, type }) {
    return (
        <FormField
            control={control}
            name={name}
            label={label}
            disabled={isPending}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg font-[500px] cursor-pointer justify-center" >{label}:</FormLabel>
                    <FormControl>
                        <Input placeholder={label} {...field} type={type} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}