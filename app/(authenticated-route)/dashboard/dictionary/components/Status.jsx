'use client';
import { Switch } from "@/components/ui/switch";
import { useState } from 'react';

const StatusSwitch = ({ status, onStatusChange }) => {
    const [currStatus, setCurrStatus] = useState(status);

    const handleChange = () => {
        const newStatus = currStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        setCurrStatus(newStatus);
        onStatusChange(newStatus);
    };

    return (
        <div className="flex items-center">
            <Switch
                checked={currStatus === 'ACTIVE'}
                onChange={handleChange}
                className="relative inline-block w-12 h-6"
            />
            <span className="ml-2 text-xl font-medium">
                {currStatus === 'ACTIVE' ? 'PUBLISHED' : 'DISABLED'}
            </span>
        </div>
    );
};

export default StatusSwitch;
