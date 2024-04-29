"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

export default function EditUserModal({ user }) {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    }

    return (
        <>
            <span onClick={() => setIsOpen(true)}>Edit User Profile</span>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                    <div className="bg-white p-4 rounded shadow-lg" onClick={e => e.stopPropagation()}>
                        <h1>Modal Content</h1>
                        <button onClick={closeModal}>Close Modal</button>
                    </div>
                </div>
            )}
        </>
    )
}