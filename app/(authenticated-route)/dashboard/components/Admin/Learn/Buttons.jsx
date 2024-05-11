"use client";

import { Button } from "@/components/ui/button";

export default function Buttons({ name, children, variant }) {
    return (
        <Button
            variant={variant || "default"}
            type="submit"
        >
            {children}
            {name}
        </Button>
    )
}