'use client';

import NoDataFound from '@/app/assets/svg/no-data';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function DictionaryPlays({ analytics }) {
    const [selectedTab, setSelectedTab] = useState('Overall');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMonthlyData = async () => {
            if (!selectedMonth || !selectedYear) return;
            setLoading(true);
            try {
                const res = await axios.get(`/api/v1/analytics`, { params: { month: selectedMonth, year: selectedYear } });
                setMonthlyAnalytics(res.data.data.monthlyData);
                setError(null);
            } catch (error) {
                console.error('Error fetching monthly data:', error);
                setError('Error fetching monthly data. Please try again later.');
                setMonthlyAnalytics([]);
            } finally {
                setLoading(false);
            };
        };

        if (selectedTab === 'Monthly') {
            fetchMonthlyData();
        }
    }, [selectedMonth, selectedYear, selectedTab]);

    // console.log current time and date
    console.log(new Date().toLocaleString());
    const renderAnalytics = (title, data) => (
        <div className="w-full space-y-6 transition-opacity duration-500 ease-in-out opacity-100">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4">
                        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full">
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <span className="text-2xl font-bold text-indigo-600">{index + 1}.</span>
                                <span className="text-2xl font-semibold tracking-wide text-gray-900">{item.word}</span>
                            </div>
                            <div className="flex items-start space-x-4 text-gray-600">
                                <span className="text-lg text-start">Language: {item.language}</span>
                            </div>
                        </div>
                        <div className="w-full sm:w-[20%] flex items-center justify-center mt-4 sm:mt-0 text-gray-600">
                            <span className="text-2xl font-semibold tracking-wide">{item._count.word}</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col gap-4 justify-center items-center h-full min-h-[400px]">
                    <NoDataFound />
                    <span className='font-semibold text-gray-600 text-xl tracking-wider '>Looks like the system doesn&apos;t have the data for that Month and Year</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center bg-gray-100 rounded-xl p-8 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dictionary Analytics - Audio Play Counter</h1>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <div className="mb-4 flex space-x-4">
                <button onClick={() => setSelectedTab('Overall')} className={`px-4 py-2 transition-colors duration-300 ${selectedTab === 'Overall' ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 '}`}>Overall</button>
                <button onClick={() => setSelectedTab('Weekly')} className={`px-4 py-2 transition-colors duration-300 ${selectedTab === 'Weekly' ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 '}`}>Weekly</button>
                <button onClick={() => setSelectedTab('Monthly')} className={`px-4 py-2 transition-colors duration-300 ${selectedTab === 'Monthly' ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 '}`}>Monthly</button>
            </div>
            {selectedTab === 'Monthly' && (
                <div className="mb-4 flex space-x-4">
                    <div className="flex flex-col">
                        <label className="mr-2 font-semibold text-gray-700 mb-1">Select Month:</label>
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mr-2 font-semibold text-gray-700 mb-1">Select Year:</label>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            {Array.from({ length: 5 }, (_, i) => (
                                <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {loading ? (
                <div className="flex justify-center items-center w-full h-full flex-col gap-4">
                    <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className='text-xl tracking-wider font-[600] text-gray-600'>
                        Fetching Data...
                    </span>
                </div>
            ) : (
                <>
                    {selectedTab === 'Overall' && renderAnalytics('Overall Analytics', analytics.overallData)}
                    {selectedTab === 'Weekly' && renderAnalytics('Weekly Analytics', analytics.weeklyData)}
                    {selectedTab === 'Monthly' && !error && renderAnalytics('Monthly Analytics', monthlyAnalytics)}
                </>
            )}
        </div>
    );
}
