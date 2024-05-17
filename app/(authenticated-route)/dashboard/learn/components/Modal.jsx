"use client";

const Modal = ({ isOpen, formData, children }) => {
    if (!isOpen) return null;
    const data = formData;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[70%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] mx-2 overflow-scroll">
                {children(data)}
            </div>
        </div>
    );
};

export default Modal;
