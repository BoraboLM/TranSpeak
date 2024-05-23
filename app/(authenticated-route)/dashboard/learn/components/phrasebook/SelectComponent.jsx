'use client';

import React from 'react';

export default function SelectComponent({ statusFilter, handleStatusFilter, languageFilter, handleLanguageFilter }) {
    return (
        <>
            <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-1 border rounded-lg cursor-pointer font-[600] tracking-wide border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out"
            >
                <option value="">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="DISABLED">DISABLED</option>
            </select>
            <select
                value={languageFilter}
                onChange={(e) => handleLanguageFilter(e.target.value)}
                className="px-6 py-1 border rounded-lg cursor-pointer font-[600] tracking-wide border-b-[8px] border-transparent hover:border-indigo-500 duration-300 ease-in-out"
            >
                <option value="">All Languages</option>
                <option value="PANGASINAN">PANGASINAN</option>
                <option value="ILOCANO">ILOCANO</option>
            </select>
        </>
    );
}
