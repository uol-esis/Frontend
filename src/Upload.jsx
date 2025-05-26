import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ConfirmNameDialog from "./Popups/ConfirmNameDialog";

import Alert from "./Alert";

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
  const [help, setHelp] = useState("Bitten laden Sie eine Excel- oder csv-Datei hoch und wählen das passende Schema dazu aus! Anschließend, klicken Sie auf weiter!")
  const [helpType, setHelpType] = useState("info");
  const [schemaName, setSchemaName] = useState("");
  const [jsonData, setJsonData] = useState(null);

  const fileInputRef = useRef(null); // Reference for the hidden input element
  const confirmNameToPreviewRef = useRef();
  const confirmNameToEditRef = useRef();
  const navigate = useNavigate();

  {/* Load the Th1 module and get the Schema List from the api*/ }
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

  const getSchemaList = function () {
    if (!Th1) {
      console.error("Th1 module is not loaded yet.");
      return;
    }
    const client = new Th1.ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new Th1.DefaultApi(client);
    api.getTableStructures((error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Response:", response);
        setSchemaList(response);
      }
    });
  }

  {/* Generate a new Schema for the selected File */}
  const generateNewSchema = function () {
    if (!Th1) {
      console.error("Th1 module is not loaded yet.");
      return;
    }
    const client = new Th1.ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new Th1.DefaultApi(client);
    const settings = new Th1.TableStructureGenerationSettings();
    // 
    const callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully to generate a schema.');
        console.log("Selected file:", selectedFile);
        console.log("Generated schema:", data); // or data
        
        //show ConfirmNameModal
        setJsonData(data.tableStructure);
        setSchemaName(selectedFile.name);
        confirmNameToPreviewRef.current?.showModal();
      }
    };
    api.generateTableStructure(selectedFile, settings, callback);
  }


  {/* Confirm name and navigate to preview page*/ }
  const confirmGeneratedName = function (newName) {
    jsonData.name = newName;
    const cleaned = JSON.parse(JSON.stringify(jsonData));
    navigate("/preview", { state: { selectedFile, generatedSchema: cleaned } }) // or data // Pass data to preview page
  };


  {/* helper functions */ }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //noch ausfüllen
  const handleAddSchema = () => {
    setSchemaName(selectedFile.name);
    confirmNameToEditRef.current?.showModal();
  };
  const handleEditSchema = () => {
    console.log("Edit schema clicked"); 
  };
  const handleDeleteSchema = () => {
    console.log("Delete schema clicked");   
  };

  useEffect(() => {
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv") && !selectedFile.name.endsWith(".xlsx") && !selectedFile.name.endsWith(".xls")) {
        setHelp("Die hochgeladene Datei ist kein Excel- oder CSV-File. Bitte laden Sie eine csv- oder Excel-Datei hoch!");
        setHelpType("error");
        return;
      }
      if (selectedFile && !selectedSchema) {
        setHelp("Datei erfolgreich hochgeladen. Bitte wählen Sie ein passendes Schema aus oder lassen ein neues Schema generieren!")
        setHelpType("info");
      }
      else if (selectedFile && selectedSchema) {
        setHelp("Datei und Schema erfolgreich ausgewählt. Klicken Sie auf weiter!");
        setHelpType("check");
      }
    };
  }, [selectedFile]);

  const isValidFile = selectedFile && ( //to check if the file ist valid (for svg in dragndrop)
    selectedFile.name.endsWith(".csv") ||
    selectedFile.name.endsWith(".xlsx") ||
    selectedFile.name.endsWith(".xls"));

  useEffect(() => {
    if (selectedSchema && helpType !== "error") {
      if (!selectedFile && selectedSchema) {
        setHelp("Schema ausgewählt. Bitte laden Sie eine passende Excel- oder CSV-Datei hoch und klicken anschließend auf weiter!");
        setHelpType("info");
      }
      else if (selectedFile && selectedSchema) {
        setHelp("Datei und Schema erfolgreich ausgewählt. Klicken Sie auf weiter!");
        setHelpType("check");
      }
    };
  }, [selectedSchema]);

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

  const schemaBlockClass = isValidFile ? "" : "opacity-50 pointer-events-none";

  const handleConfirm = () => navigate("/preview", { state: { selectedFile, selectedSchema } }); //name-popup to preview

  {/* Actual page */ }
  return (
    <div className=" p-2 space-y-6 mx-2 my-5 ">

      {/* Popup */}
      <ConfirmNameDialog dialogRef={confirmNameToPreviewRef} name={schemaName} onCLickFunction={confirmGeneratedName}/>

      <ConfirmNameDialog dialogRef={confirmNameToEditRef} name={schemaName} onCLickFunction={() => console.log("go to edit")}/>

      {/* Container: File Upload + Schema (left, right) */}
      <div className="flex flex-col lg:flex-row justify-center lg:space-x-8 space-y-4 lg:space-y-0 mx-15">
        {/*Left Upload */}
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
            <p className="mt-2 text-sm text-gray-700">Ausgewählte Datei: {selectedFile.name}</p>
          )}
        </div>

        {/* Right Up, Down */}
        <div className={`flex flex-col space-y-6 w-full lg:w-2/3 ${schemaBlockClass}`}>
          {/* Right Up  */}
          <div className="flex-1 p-4 bg-gray-100 rounded-[10px] flex flex-col h-full">
            <h2 className="text-xl font-bold mb-2">Bestehende Tabellentransformation verwenden</h2>
            <div className="flex flex-row justify-between mb-2">
              {/* Dropdown-Menü für Thema */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400">
                    Thema
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute left-0 z-10 w-56 max-h-[200px] overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <div className="py-1">
                    {themaList.map((thema, index) => (
                      <MenuItem key={index}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {thema}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              {/* Search */}
              <label className="flex w-full items-center gap-2 border border-gray-200 bg-white px-2">
                <input
                  type="text"
                  className="grow p-1"
                  placeholder="Suche..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* KOmmt neuer Plus Button noch rein? */}
              </label>
              <button type="button" onClick={handleAddSchema} className="ml-2 inline-flex items-center p-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-900 shadow-sm hover:bg-gray-400">
                <span className="text-lg font-bold">+</span>
              </button>
            </div>
            {/* list existing scheme */}
            <div className="p-1 w-full bg-white rounded-[10px] overflow-auto flex-1">
              <ul>
                {filteredSchemaList.map((schema, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center cursor-pointer p-1 rounded whitespace-nowrap text-sm text-gray-700 hover:bg-gray-200 ${selectedSchema === schema ? 'bg-gray-300' : ''}`}
                    onClick={() => setSelectedSchema(schema)}
                  >
                    {/* schema */}
                    {schema.name}
                    <div className="flex gap-2">
                    
                      <button type ="button"
                        onClick={(e) => {e.stopPropagation(); handleDeleteSchema();}}
                        className="p-1 rounded hover:bg-gray-200 transform transition-transform duration-150 hover:scale-110">
                          🗑️
                        </button>
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
            {/* Weiter Button */}
            <div className="mt-4 ">
              <button
                type="button"
                onClick={handleConfirm}
                className={`w-full rounded-md py-2 text-sm font-semibold text-white  ${
                  selectedFile && selectedSchema ? 'bg-gray-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!selectedFile || !selectedSchema}
              >
                Weiter
              </button>
            </div>
          </div>

          {/* Down new scheme */}
          <div className="p-2 bg-gray-100 rounded-[10px]">
            <h2 className="text-xl font-bold mb-2">Neue Tabellentransformation erstellen</h2>
            <button
              type="button"
              onClick={generateNewSchema}
              className={`w-full rounded-md py-2 text-sm font-semibold text-white ${
                selectedFile && isValidFile ? 'bg-gray-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedFile || !isValidFile}
            >
              Generierung
            </button>
          </div>
        </div>
      </div>

      {/* Navigationsbereich unten */}
      <div className="flex justify-start mt-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="fixed bottom-[5vh] flex items-center gap-2 rounded-lg bg-gray-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
        >
          Zurück
          
        </button>
      </div>
    </div>
  );
}

export default Upload;