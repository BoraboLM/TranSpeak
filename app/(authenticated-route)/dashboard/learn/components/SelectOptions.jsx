"use client";

import FormInput from "@/components/Reusable/FormInput";
import { SelectCategoryInput } from "@/components/Reusable/SelectCategoryInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SelectOption({ formControl, categoryData, isPending }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            {!selectedOption ? (
                <div className="flex flex-col w-full items-center gap-2">
                    <h2 className="w-full text-lg text-nowrap text-left truncate tracking-wide font-[500]">Select Category</h2>
                    <div className="flex flex-col w-full sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-2 items-center justify-center">
                        <Button type="button" className="text-wrap w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out justify-between" variant="secondary" onClick={() => handleOptionChange('existing')}>
                            Use Existing
                        </Button>
                        <Button type="button" className="text-wrap w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out justify-between" variant="secondary" onClick={() => handleOptionChange('new')}>
                            Add New
                        </Button>
                    </div>
                </div>
            ) : selectedOption === 'existing' ? (
                <div className="flex flex-col gap-2">
                    <SelectCategoryInput
                        control={formControl}
                        name={"title"}
                        data={categoryData}
                        isPending={isPending}
                    />

                    <Button type="button" className="text-wrap text-sm border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out" onClick={() => handleOptionChange('new')}>
                        New Category
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <FormInput
                        control={formControl}
                        isPending={isPending}
                        name={"title"}
                        label={"New Category"}
                        type={"text"}
                    />
                    <Button type="button" className="text-wrap text-sm border-b-[6px] border-transparent hover:border-indigo-500 duration-300 ease-in-out" onClick={() => handleOptionChange('existing')}>
                        Use Existing
                    </Button>
                </div>
            )}
        </>
    )
}