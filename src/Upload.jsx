import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import './css/upload.css';

function Upload() {
  const [schemaList, setSchemaList] = useState([
    { name: "Schema 1", description: "Description for Schema 1" },
    { name: "Schema 2", description: "Description for Schema 2" },
    { name: "Schema 3", description: "Description for Schema 3" }
  ]); // Default for the list of schemata
  const [themaList, setThemaList] = useState(["Thema 1", "Thema 2", "Thema 3", "Thema 4", "Thema 5", "Thema 6", "Thema 7", "Thema 8", "Thema 9", "Thema 10", "Thema 11", "Thema 12", "Thema 13", "Thema 14", "Thema 15", "Thema 16", "Thema 17", "Thema 18", "Thema 19", "Thema 20", "Thema 21", "Thema 22", "Thema 23", "Thema 24"]); // State for the list of themes
  const [Th1, setTh1] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const fileInputRef = useRef(null); // Reference for the hidden input element
  const navigate = useNavigate();

  {/* Load the Th1 module and get the Schema List from the api*/}
  useEffect(() => {
    import('th1').then(module => {
      setTh1(module);
    }).catch(error => {
      console.error("Error loading th1 module:", error);
    });
  }, []);

  useEffect(() => {
    if (Th1) {
      getSchemaList();
    }
  }, [Th1]);

  const getSchemaList = function() {
    if (!Th1) {
      console.error("Th1 module is not loaded yet.");
      return;
    }
    const client = new Th1.ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
    const api = new Th1.DefaultApi(client);
    api.getTableStructures((error, response) => {
      console.log("Response:", response);
      setSchemaList(response);
    });
  };

  {/* helper functions */}
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const filteredSchemaList = schemaList
    .filter(schema => schema.name.toLowerCase().includes(searchQuery.toLowerCase())); // Filter based on the search query


  {/* Actual page */}
  return (
    <div className="flex flex-col justify-start bg-white h-screen">
      <div className="flex flex-row justify-start space-x-[5vw]">
        {/* Upload Box */}
        <div
          className="flex flex-col justify-end p-4 w-[30vw] h-[70vh] ml-[5vw] mt-[5vh] bg-gray-100 rounded-[10px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Upload Drag and drop box */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()} // Trigger Input per Klick
            className="relative block h-full w-full rounded-lg bg-white border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
        </div>

        {/* Schema Box */}
        <div className="flex flex-col justify-start p-4 w-[55vw] h-[70vh] mt-[5vh] bg-gray-100 rounded-[10px]">
          <div className="flex flex-row justify-between">
            {/* Dropdown Menu für Thema */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400">
                  Thema 
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute left-0 z-10 w-56 h-[40vh] origin-top-left overflow-y-auto overflow-x-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {themaList.map((thema, index) => (
                    <MenuItem key={index}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        {thema}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            {/* Suchfeld */}
            <label className="border-2 border-gray-200 w-full input input-bordered flex items-center gap-2 bg-white">
              <input
                type="text"
                className="grow"
                placeholder="Suche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
              </svg>
            </label>
          </div>

          {/* Auswahlliste für Schema */}
          <div className="flex flex-col justify-start p-1 w-full h-full bg-white rounded-[10px] overflow-y-auto overflow-x-auto">
            <ul>
              {filteredSchemaList.map((schema, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-left text-sm text-gray-700 hover:bg-gray-200 p-1 rounded whitespace-nowrap ${selectedSchema === schema ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedSchema(schema)}
                >
                  {schema.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Neues Schema Button */}
          <button
            type="button"
            onClick={() => navigate("/wip")}
            className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Neues Schema
          </button>

        </div>
      </div>

      <div className="flex justify-end pr-[5vw] gap-[5vw] w-full">
        {/* Zurück Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Zurück
        </button>

        {/* Anwenden Button (weiter) */}
        <button
          type="button"
          onClick={() => {
            console.log("Selected file:", selectedFile);
            console.log("Selected schema:", selectedSchema.name, selectedSchema?.id );
            navigate("/preview", { state: { selectedFile, selectedSchema } }); // Pass data to preview page
          }}
          className={`mt-4 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedFile && selectedSchema ? 'bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!selectedFile || !selectedSchema}
        >
          Anwenden
        </button>
      </div>

    </div>
  );
}

export default Upload;

