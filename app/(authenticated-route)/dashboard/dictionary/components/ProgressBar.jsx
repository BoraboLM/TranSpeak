'use client';

import React from 'react';

const ProgressBar = ({ shouldShowProgress, averageProgress }) => {
    return (
        shouldShowProgress && averageProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-6 mt-6">
                <div
                    className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-white font-[600] tracking-widest"
                    style={{ width: `${averageProgress}%`, height: '30px' }}
                >
                    {averageProgress === 100 ? 'Upload complete!' : `${averageProgress.toFixed(2)}%`}
                </div>
            </div>
        )
    );
};

export default ProgressBar;