"use client";

const Modal = ({ isOpen, formData, children }) => {
    if (!isOpen) return null;
    const data = formData;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                {children(data)}
            </div>
        </div>
    );
};

export default Modal;
