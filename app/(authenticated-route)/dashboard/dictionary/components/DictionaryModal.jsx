"use client";

import { useEffect, useState } from 'react';
import styles from './DictionaryModal.module.css';

const DictionaryModal = ({ isOpen, formData, children }) => {
    const [show, setShow] = useState(isOpen);
    const data = formData;

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeoutId = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeoutId);
        }
    }, [isOpen]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className={`${isOpen ? styles.fadeIn : styles.fadeOut} ${styles.modalContent} bg-white rounded-lg shadow-lg p-4 w-[85%] sm:w-[85%] md:w-[70%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-2 overflow-scroll`}>
                {children(data)}
            </div>
        </div>
    );
};

export default DictionaryModal;
