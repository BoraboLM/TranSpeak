"use client";

export default function FooterPhrasebook({ }) {
    const data = [
        {
            title: 'Computer',
            language: 'PANGASINAN'
        },
        {
            title: 'Computer',
            language: 'ILOCANO'
        },
        {
            title: 'Computer',
            language: 'ILOCANO'
        },
        {
            title: 'Computer',
            language: 'ILOCANO'
        }
    ]
    return (
        <div className="flex flex-col md:flex-row h-full w-full gap-4 px-4">
            <div className="flex flex-col gap-4 p-4 flex-1 bg-gray-200 rounded-lg sm:w-full md:w-full">
                <h1 className="text-2xl font-[900] text-gray-800 tracking-widest">Phrasebook Data.</h1>
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <h1 className="text-lg font-bold">{item.title}</h1>
                        <p className="text-md">{item.language}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}