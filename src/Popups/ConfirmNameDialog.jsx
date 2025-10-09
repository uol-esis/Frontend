import { useState, useEffect } from "react";
export default function ConfirmNameDialog({dialogRef, name, onClickFunction,  errorText, file, useExistingSchema}){
    const [error, setError] = useState(errorText)
    const [text, setText] = useState(name);
    const [filename, setFilename] = useState("");
    const [baseName, setBaseName] = useState(""); // Base name without extension
    const [extension, setExtension] = useState(""); // File extension
    const [tooLong, setTooLong] = useState(false);
    const [tableTooLong, setTableTooLong] = useState(false);

    useEffect(() => {
        setTooLong(getByteSize(`${baseName}${extension}`) > 63);
    }, [baseName, extension]);

    useEffect(() => {
        setTableTooLong(getByteSize(text) > 255);
    }, [text]);

        useEffect(() => {
            setText(name);
        }, [name]);
    
        useEffect(() => { 
            // store the file name (safe when file is null)
            setFilename(file?.name ?? "");
        }, [file]);

        useEffect(() => {
        if (file) {
            const lastDotIndex = file.name.lastIndexOf(".");
            if (lastDotIndex !== -1) {
                setBaseName(file.name.substring(0, lastDotIndex)); // Extract base name
                setExtension(file.name.substring(lastDotIndex)); // Extract extension
            } else {
                setBaseName(file.name); // No extension, use full name
                setExtension(""); // No extension
            }
        }
        }, [file]);

    const handleConfirm = async () => {
        // wenn secondClickFunction eine Funktion ist (sicher prüfen), erst Dateiname übergeben
        const newFileName = `${baseName}${extension}`;

        if (typeof onClickFunction === "function") {
            const success = await onClickFunction(newFileName, text);
            if(!success) {
                setError("Name wird bereits verwendet");
                return;
            }
        }
        dialogRef.current?.close();
    }


    const getByteSize = (str) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    return encoded.length;
  };  

    useEffect(() => {
        setError(errorText);
    }, [errorText]);

    return(
        <dialog  className="justify-self-center mt-[20vh] w-[50vw] shadow-md bg-white " ref={dialogRef}>
            
            <p className="text font-semibold pt-2">Dateinamen bestätigen oder bearbeiten</p>
            <div className="flex flex-col justify-between h-full p-5 bg-white">
                <p htmlFor="username" className=" text-left block text-sm/6 font-medium text-gray-900">
                        Dateiname:
                    </p>
                { tooLong && ( 
                    <label htmlFor="filename" className="text-sm font-semibold text-red-800 bg-red-200 mb-1">
                        Der Dateiname ist zu lang. Bitte kürzen Sie ihn.
                    </label> )}
                    
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <input
                            id="filename"
                            name="fileName"
                            type="text"
                            value={baseName}
                            onChange={(evt) => setBaseName(evt.target.value)} 
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
                        />
                        <span className="text-gray-500 pr-2">{extension}</span> {/* Display extension */}
                    </div>
                
                <div className="mt-8 border-t border-gray-300"></div>

            
                <p className="text font-semibold pt-8 pb-4">Tabellentransformationsnamen bestätigen oder bearbeiten</p>
                { tableTooLong && ( 
                    <label htmlFor="filename" className="text-sm font-semibold text-red-800 bg-red-200 mb-1">
                        Der generierte Tabellentransformationsname ist zu lang. Bitte kürzen Sie ihn.
                    </label> )}
                {/* Text input */} 
                <div className="flex flex-col">
                    
                    <label htmlFor="username" className=" text-left block text-sm/6 font-medium text-gray-900">
                        Tabellentransformationsname:
                    </label>
                    <p className="text-sm font-semibold text-red-800 bg-red-200 mb-1">{error}</p>
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <input
                            id="username"
                            name="dataName"
                            type="text"
                            value={text}
                            disabled={useExistingSchema}
                            onChange={(evt) => { 
                                setText(evt.target.value);
                                setError("");
                            }}
                            className={`block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 ${useExistingSchema ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}`}
                        />
                        </div>
                </div>
                {/* Buttons */}
                <div className="flex mt-2 justify-between">
                    <button
                        className=" p-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {dialogRef.current?.close()}}
                    >
                        Zurück
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={tooLong || tableTooLong || error}
                        className={`p-5 rounded-md py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                        ${tooLong || tableTooLong || error ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-600 text-white hover:bg-indigo-500"}`} >
                        Bestätigen
                    </button>
                </div>
            </div>
            
        </dialog>
    );
}