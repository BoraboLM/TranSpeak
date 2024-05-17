"use client";

export default function HistoryRecords({ data, historyRecord }) {
    return (
        <div className="flex-1 md:flex-[1.5]">
            <div className="w-full bg-gray-200 rounded-xl p-4">
                <h1 className="text-2xl font-bold text-gray-800">Phrasebook History Record </h1>
                <div className="overflow-y-auto w-full min-h-[600px] max-h-[600px] p-4 gap-4">
                    {data.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <span className="text-gray-600 text-xl font-[600] tracking-widest">No records found.</span>
                        </div>
                    ) : (
                        data.map((item, index) => {
                            const createdAt = new Date(item.createdAt);
                            const formattedDate = createdAt.toLocaleDateString();
                            const formattedTime = createdAt.toLocaleTimeString('fil-PH', { hour: '2-digit', minute: '2-digit' });
                            return (
                                <div key={index} className="flex flex-col gap-4 px-4 py-3 border-b-2 border-muted max-h-[600px]">
                                    <span
                                        onClick={() => historyRecord(item)}
                                        className="text-md font-[500] text-wrap cursor-pointer hover:text-indigo-500 hover:font-[600] ease-in-out duration-200">
                                        {item.user.name} - {formattedTime} - {formattedDate}
                                    </span>
                                </div>
                            )
                        })
                    )
                    }
                </div>
                {data.length > 0 ? (
                    <div className="flex justify-center items-center mt-2 font-[600] tracking-[.2em] p-2 text-gray-600">
                        Scroll to view more records.
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}