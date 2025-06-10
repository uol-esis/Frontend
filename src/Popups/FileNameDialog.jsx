import { useState, useEffect } from "react";

export default function FileNameDialog({ dialogRef, fileName, onConfirm }) {
    const [baseName, setBaseName] = useState(""); // Base name without extension
    const [extension, setExtension] = useState(""); // File extension

    useEffect(() => {
        if (fileName) {
            const lastDotIndex = fileName.lastIndexOf(".");
            if (lastDotIndex !== -1) {
                setBaseName(fileName.substring(0, lastDotIndex)); // Extract base name
                setExtension(fileName.substring(lastDotIndex)); // Extract extension
            } else {
                setBaseName(fileName); // No extension, use full name
                setExtension(""); // No extension
            }
        }
    }, [fileName]);

    const handleConfirm = () => {
        const newFileName = `${baseName}${extension}`; // Combine base name and extension
        onConfirm(newFileName); // Pass the modified name to the parent component
        dialogRef.current?.close();
    };

    return (
        <dialog className="justify-self-center mt-[20vh] h-[30vh] w-[50vw] shadow-md bg-white" ref={dialogRef}>
            <div className="flex flex-col justify-between h-full p-5 bg-white">
                <p className="text font-semibold">Dateinamen bestätigen oder bearbeiten</p>
                {/* Text input */}
                <div className="flex flex-col">
                    <label htmlFor="filename" className="text-left block text-sm font-medium text-gray-900">
                        Der Dateiname ist zu lang. Bitte kürzen Sie ihn.
                    </label>
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <input
                            id="filename"
                            name="fileName"
                            type="text"
                            value={baseName}
                            onChange={(evt) => setBaseName(evt.target.value)} // Update base name only
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                        />
                        <span className="text-gray-500">{extension}</span> {/* Display extension */}
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        className="p-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => dialogRef.current?.close()}
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="p-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible-outline-2 focus-visible-outline-offset-2 focus-visible-outline-indigo-600"
                    >
                        Bestätigen
                    </button>
                </div>
            </div>
        </dialog>
    );
}