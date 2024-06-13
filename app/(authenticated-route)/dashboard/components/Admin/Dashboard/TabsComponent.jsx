'use client';

import { useState } from "react";

export default function Tabs({ tabs, defaultTab, children }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
    };

    return (
        <div className="w-full h-full">
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? "border-indigo-500 text-indigo-500" : "border-transparent text-gray-500"} border-b-2 font-medium text-lg`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="w-full h-full">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={`transition-opacity duration-300 ${activeTab === tab ? 'opacity-100' : 'opacity-0'} w-full h-full`}
                    >
                        {activeTab === tab && children[tab]}
                    </div>
                ))}
            </div>
        </div>
    );
}
