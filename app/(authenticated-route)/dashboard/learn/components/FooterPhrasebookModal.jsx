'use client';

import { Button } from "@/components/ui/button";
import Modal from "./Modal";

export default function PhrasebookFooterModal({ isOpen, formData, handleCloseFooterModal }) {
    return (
        <Modal isOpen={isOpen} formData={formData}>
            {(data) => {
                return (
                    <>
                        <div className="w-full h-[500px]">
                            <h1>{data.title}</h1>
                            <Button
                                variant="secondary"
                                onClick={() => handleCloseFooterModal()}
                            >
                                Close Modal
                            </Button>
                        </div>
                    </>
                )
            }}
        </Modal>
    )
}