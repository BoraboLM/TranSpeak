'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ModalError = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {children}
                        <div className="flex justify-end mt-4">
                            <Button onClick={onClose}>Close</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ModalError;
