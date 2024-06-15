'use client';

import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import SelectComponent from "./SelectComponent";
import PhrasebookListModal from "./PhrasebookListModal";

export default function PhrasebookList({ data }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [setIsOpen])

    // Handle Data state and Open State
    const isOpenModal = (data) => {
        setFormData(data);
        setIsOpen(true);
    }

    // Handle Close Modal State
    const handleClosePhrasbookListModal = () => {
        setIsOpen(false);
    }

    // Filtering Data
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
    };

    const handleLanguageFilter = (value) => {
        setLanguageFilter(value);
    };

    const filteredData = data.filter(item =>
        (statusFilter === '' || item.status === statusFilter) &&
        (languageFilter === '' || item.language === languageFilter) &&
        (item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.english_word.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.target_word.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="px-4 py-2 bg-gray-300 rounded-xl min-h-[600px]">
            <div className="px-4 py-2 flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex flex-1 flex-col lg:flex-row gap-4 items-center w-full">
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="px-4 py-2 w-full border rounded-lg"
                    />
                    <span className="text-xl font-[600] text-gray-600 whitespace-nowrap mt-2 lg:mt-0">
                        Total Data: {filteredData.length}
                    </span>
                </div>

                <div className="flex flex-1 justify-center sm:justify-center md:justify-center lg:justify-end xl:justify-end 2xl:justify-end gap-4 w-full">
                    <SelectComponent
                        statusFilter={statusFilter}
                        handleStatusFilter={handleStatusFilter}
                        languageFilter={languageFilter}
                        handleLanguageFilter={handleLanguageFilter}
                    />
                </div>
            </div>
            {filteredData.length > 0 ? (
                <>
                    {
                        filteredData.map((item, index) => (
                            <div
                                onClick={() => isOpenModal(item)}
                                key={index}
                                className="rounded-lg shadow relative p-4 bg-white cursor-pointer hover:shadow-2xl hover:bg-gradient-to-b from-indigo-50 to-indigo-100 transition duration-300 ease-in-out m-4"
                            >
                                <div className="flex justify-between items-center border-b-2">
                                    <span className="text-md font-[600] text-gray-500">
                                        {item.user.name} - {new Date(item.createdAt).toLocaleDateString()} - {new Date(item.createdAt).toLocaleTimeString('fil-PH', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <div className={`flex justify-center items-center text-white text-sm font-bold px-3 py-1 rounded-full ${item.status === 'ACTIVE' ? 'bg-green-400' : 'bg-red-400'} mb-1`}>
                                        <span className="text-md font-[600]">{item.status}</span>
                                    </div>
                                </div>
                                <h1 className="text-lg font-[700] text-gray-800 tracking-wider truncate">{item.title}</h1>
                                <p className="text-lg font-[400] text-gray-600 truncate">{item.language}</p>
                                <div className="flex flex-col gap-2 ">
                                    <span className="text-sm font-[400] text-gray-500 truncate">{item.sourceLanguage}: {item.english_word}</span>
                                    <span className="text-sm font-[400] text-gray-500 truncate">{item.targetLanguage}: {item.target_word}</span>
                                </div>
                            </div>
                        ))
                    }
                </>
            ) : (
                <>
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-lg font-[600] text-gray-500">No data found</h1>
                    </div>
                </>
            )}
            {/* Modal */}
            <PhrasebookListModal
                isOpen={isOpen}
                formData={formData}
                handleClosePhrasbookListModal={handleClosePhrasbookListModal}
            />
        </div>
    )
}