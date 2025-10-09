import { useState, useRef, useEffect } from "react";
import FileNameDialog from "./Popups/FileNameDialog";

export default function UploadComponent({setFile, setValid}){

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null); // Reference for the hidden input element
    const fileNameDialogRef = useRef(null);
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [isValidFile, setIsValidFile] = useState(false);

    const getByteSize = (str) => {
      const encoder = new TextEncoder();
      const encoded = encoder.encode(str);
      return encoded.length;
    };

    useEffect(() => {

    if (selectedFile) {
      const isValid = selectedFile.name.endsWith(".csv") || selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls");

      setIsValidFile(isValid);
      setFile(selectedFile);
      setValid(isValid);

      if (isValid) {
        setFile(selectedFile);
        setValid(true);
      }
    } else {
      setIsValidFile(false);
    }
  }, [selectedFile]);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    {/* helper functions */ }
    const handleFileChange = (event) => {
        console.log("change file ");
        setSelectedFile(event.target.files[0]);

    }

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    

    return(
      <div>
        <div
          className="flex flex-col p-4 w-full bg-white shadow rounded-[10px] min-h-[75vh]"
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
                {isValidFile ? (
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
            <p className="mt-2 text-sm text-gray-700">
              Ausgewählte Datei: {selectedFile.name}
              {!isValidFile && (
                <span className="ml-2 text-sm font-semibold text-red-600"> < br/>  Falsches Dateiformat. Laden Sie bitte eine .csv oder Excel (.xls/.xlsx) hoch.</span>
              )}
            </p>
          )}
        </div>
      </div>
    );
}