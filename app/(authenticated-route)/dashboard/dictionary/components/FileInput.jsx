'use client';

const FileInput = ({ name, handleFileChange }) => (
    <div className="mb-6">
        <input
            type="file"
            name={name}
            accept="audio/*"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
    </div>
);

export default FileInput
