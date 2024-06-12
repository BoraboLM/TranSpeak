'use client';

export default function PageLoading() {
    const text = "Loading...";
    const animationClasses = [
        'animate-bounce1',
        'animate-bounce2',
        'animate-bounce3',
        'animate-bounce4',
        'animate-bounce5',
        'animate-bounce6',
        'animate-bounce7',
        'animate-bounce8',
        'animate-bounce9'
    ];

    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center h-24 w-24">
                    <div className="absolute rounded-full h-32 w-32 bg-transparent border-4 border-transparent">
                        <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-red-500 border-l-transparent"></div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-xl mt-4 font-[600]">
                    {text.split('').map((char, index) => (
                        <span key={index} className={`${animationClasses[index]} inline-block tracking-widest`}>{char}</span>
                    ))}
                </p>
            </div>
        </div>
    );
}
