import Header from "./Header";
import { useState } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Store selected file
  };

  // Handle file upload (Example: Simulate API call)
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // Simulate a file upload
    console.log("Uploading:", selectedFile);
    alert(`File "${selectedFile.name}" uploaded successfully!`);
  };

  // Trigger file input click
  const handleBrowseFiles = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Header/>
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleBrowseFiles}
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
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleBrowseFiles}
        >
        Dateien durchsuchen
      </button>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
}
  
export default Upload;
  