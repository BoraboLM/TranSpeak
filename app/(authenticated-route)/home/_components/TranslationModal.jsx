"use client";

const TranslationModal = ({ isOpen, formData, children }) => {
    if (!isOpen) return null;
    const data = formData;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[85%] sm:w-[85%] md:w-[70%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-2 overflow-scroll">
                {children(data)}
            </div>
        </div>
    );
};

export default Modal;
