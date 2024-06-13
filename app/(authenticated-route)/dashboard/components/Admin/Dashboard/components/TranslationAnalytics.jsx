'use client';

export default function TranslationAnalytics({ translationData }) {
    return (
        <div className="w-full flex flex-col items-center bg-gray-100 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Translation Analytics - Translation Counter</h1>
            <div className="w-full space-y-6">
                {translationData.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg px-6 py-4">
                        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full">
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <span className="text-2xl font-bold text-blue-600">{index + 1}.</span>
                                <span className="text-2xl font-semibold tracking-wide text-gray-900">{item.inputLang} → {item.outputLang}</span>
                            </div>
                            <div className="flex items-start space-x-4 text-gray-600">
                                <span className="text-lg text-start">Translations: {item._count.id}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
