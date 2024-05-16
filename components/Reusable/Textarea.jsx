"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

export default function PhrasebookTextarea({ control, name, label, isPending }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg font-[500px] cursor-pointer justify-center">{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            disabled={isPending}
                            placeholder="SAH-LAH-MAT POH!"
                            className="resize-none h-[75px]"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}