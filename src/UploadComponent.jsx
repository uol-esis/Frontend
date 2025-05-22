import { useState, useRef } from "react";

export default function UploadComponent({setFile, setValid}){

    const [selectedFile, setSelectedFile] = useState(null);
    const [validFile, setValidFile] = useState(false);
    const fileInputRef = useRef(null); // Reference for the hidden input element

    const isValid = (file) => {
        if( file.name.endsWith(".csv") || 
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")){
            return true;
        }else return false;
    }

     const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
        if(isValid(file)){
            setValidFile(true);
            setValid(true);
            setFile(file);
        }else setValid(false);
    };

    {/* helper functions */ }
    const handleFileChange = (event) => {
        console.log("change file");
        setSelectedFile(event.target.files[0]);
        if(isValid(event.target.files[0])){
            console.log("set file and valid");
            setValidFile(true);
            setValid(true);
            setFile(event.target.files[0]);
        }else setValid(false);
        
    }

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    return(
        <div
          className="flex flex-col p-4 w-full lg:w-1/3 bg-gray-100 rounded-[10px] min-h-[75vh]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
        
          <button
            type="button"
            onClick={handleFileInputClick}
            className="relative flex-1 rounded-lg bg-white border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {selectedFile ? (
              <>
                {validFile ? (
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-green-500"
                  >
                    <path d="M14 24l8 8 12-12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-red-500"
                  >
                    <line x1="12" y1="12" x2="36" y2="36" strokeWidth={2} strokeLinecap="round" />
                    <line x1="36" y1="12" x2="12" y2="36" strokeWidth={2} strokeLinecap="round" />
                  </svg>
                )}
                <span className="mt-2 block text-sm font-semibold text-gray-900">{selectedFile.name}</span>
              </>
            ) : (
              <>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-400"
                >
                  <path
                    d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-2 block text-sm font-semibold text-gray-900">Datei hochladen</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleFileInputClick}
            className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Dateien durchsuchen
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-700">Ausgewählte Datei: {selectedFile.name}</p>
          )}
        </div>
    );
}