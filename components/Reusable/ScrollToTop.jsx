"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (window.scrollY > 250) {
            if (!showScroll) setShowScroll(true);
        } else {
            if (showScroll) setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
        // eslint-disable-next-line
    }, [showScroll]);

    return (
        <div className="w-full rounded-l-[30px] px-2 py-2">
            <div className="flex flex-col gap-4">
                <button
                    className={`fixed bottom-12 right-14 p-4 rounded-full bg-indigo-500 text-white transition-all duration-500 ease-in-out ${showScroll ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-2'}`}
                    onClick={scrollTop}
                >
                    Scroll to top
                </button>
            </div>
        </div>
    );
}
