import Header from "./Header";
import { useState, useRef } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Referenz für das versteckte Input-Element

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    console.log("Uploading:", selectedFile);
    alert(`File "${selectedFile.name}" uploaded successfully!`);
  };


  return (
    <div>
      <Header />

      {/* Upload Button als Trigger */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()} // Trigger Input per Klick
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="mx-auto size-12 text-gray-400"
        >
          <path
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">Datei hochladen</span>
      </button>

      {/* Zweiter Button, der ebenfalls den Upload auslöst */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()} // Input per Button-Klick öffnen
        className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Dateien durchsuchen
      </button>

      {/* Input-Element verstecken mit "hidden" */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile && <p className="mt-2 text-sm text-gray-700">Ausgewählte Datei: {selectedFile.name}</p>}

      <button
        type="button"
        onClick={handleUpload}
        className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Datei hochladen
      </button>
    </div>
  );
}

export default Upload;
