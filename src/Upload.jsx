import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
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
      if (error) {
        console.error(error);
      } else {
        console.log("Response:", response);
        setSchemaList(response);
      }
    });
  };

  {/* Generate a new Schema for the selected File*/}
  const generateNewSchema = function() {
    if (!Th1) {
      console.error("Th1 module is not loaded yet.");
      return;
    }
    const client = new Th1.ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
    const api = new Th1.DefaultApi(client);
    // 
    const callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully.');
        console.log('Data:', data);
        console.log('Response:', response);
        //setSchemaList(schemaList, data OR response);
      }
    };
    api.generateNewSchema(selectedSchema.id, selectedFile, callback);
  };


  {/* helper functions */}
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv") && !selectedFile.name.endsWith(".xlsx") && !selectedFile.name.endsWith(".xls")) {
        setHelp("Die hochgeladene Datei ist kein Excel- oder CSV-File. Bitte laden Sie eine csv- oder Excel-Datei hoch!");
        setHelpType("error");
        return;
      }
      if (selectedFile && !selectedSchema) {
        setHelp("Datei erfolgreich hochgeladen. Bitte wählen Sie das passende Schema dazu aus und klicken anschließend auf weiter!");
        setHelpType("info");
      }
      else if (selectedFile && selectedSchema) {
        setHelp("Datei und Schema erfolgreich ausgewählt. Klicken Sie auf weiter!");
        setHelpType("check");
      }
    };
  }, [selectedFile]);

  const isValidFile= selectedFile && ( //to check if the file ist valid (for svg in dragndrop)
    selectedFile.name.endsWith(".csv") ||
    selectedFile.name.endsWith(".xlsx") ||
    selectedFile.name.endsWith(".xls")  );

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


  {/* Popups for WIP handling */}
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [newPopupPos, setNewPopupPos] = useState({ top: 0, right: 0 });
  const [editPopupPos, setEditPopupPos] = useState({ top: 0, right: 0 });
  const [deletePopupPos, setDeletePopupPos] = useState({ top: 0, right: 0 });

  const newPopupRef = useRef(null);
  const editPopupRef = useRef(null);
  const deletePopupRef = useRef(null);

  function openNewPopup(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    setNewPopupPos({ top: rect.top-rect.height*3.2, left: rect.left });
    setIsNewOpen(true);
  }

  function openEditPopup(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    setEditPopupPos({ top: rect.top-rect.height*3.2, left: rect.left });
    setIsEditOpen(true);
  }

  function openDeletePopup(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    setDeletePopupPos({ top: rect.top-rect.height*3.2, left: rect.left - 50});
    setIsDeleteOpen(true);
  }

  function closeNewPopup() {
    setIsNewOpen(false);
  }

  function closeEditPopup() {
    setIsEditOpen(false);
  }

  function closeDeletePopup() {
    setIsDeleteOpen(false);
  }



  {/* Actual page */}
  return (
    <div className="flex flex-col justify-start bg-white h-[85vh]">
      <Alert 
        text={help}
        type={helpType}/>      
      <div className="flex flex-row justify-start space-x-[5vw]">
        {/* Upload Box */}
        <div
          className="flex flex-col justify-end p-4 w-[30vw] h-[62vh] ml-[5vw] mt-[2vh] bg-gray-100 rounded-[10px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Upload Drag and drop box */}
          <button
              type="button"
              onClick={handleFileInputClick}
              className="relative block h-full w-full rounded-lg bg-white border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {selectedFile ? (
                <>
                  {isValidFile ? (
                    // green for valid svg
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-green-500"
                    >
                      <path
                        d="M14 24l8 8 12-12"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    // red for not valid svg
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-red-500"
                    >
                      <line
                        x1="12"
                        y1="12"
                        x2="36"
                        y2="36"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                      <line
                        x1="36"
                        y1="12"
                        x2="12"
                        y2="36"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  )} 
                  <span className="mt-2 block text-sm font-semibold text-gray-900">{selectedFile.name}</span> 
                </> //filename in dragndrop box
              ) : (   //normal svg
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



          {/* Zweiter Button, der ebenfalls den Upload auslöst */}
          <button
            type="button"
            onClick={handleFileInputClick} // Use the same function
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
        <div className="flex flex-col justify-start p-4 w-[55vw] h-[62vh] mt-[2vh] bg-gray-100 rounded-[10px]">
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
          
          <div className="flex gap-4 justify-center w-full">
            {/* Schema generieren Button */}
            <button
              type="button"
              //onClick = {generateNewSchema}
              className={`mt-4 flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedFile && isValidFile? 'bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!selectedFile || !isValidFile}
            >
              Schema generieren
            </button>

            {/* Neues Schema Button */}
            <button
              type="button"
              onClick={openNewPopup}
              className="mt-4 flex-1 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Neues Schema
            </button>
            {isNewOpen && (
              <div 
                ref={newPopupRef} 
                id="new-popup" 
                style={{ top: newPopupPos.top, left: newPopupPos.left }}
                className="absolute bg-white shadow-lg rounded-lg p-4"
              >
                <h2>Weiterleitung, um neues Schema zu erstellen</h2>
                <button onClick={closeNewPopup} className="mt-4 bg-blue-500 text-white p-2 rounded">
                  Schließen
                </button>
              </div>
            )}
            
            {/* Schema bearbeiten Button */}
            <button
              type="button"
              onClick={openEditPopup}
              className={`mt-4 flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedSchema ? 'bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!selectedSchema}
            >
              Schema bearbeiten
            </button>
            {isEditOpen && (
              <div 
                ref={editPopupRef} 
                id="edit-popup" 
                style={{ top: editPopupPos.top, left: editPopupPos.left }}
                className="absolute bg-white shadow-lg rounded-lg p-4"
              >
                <h2>Weiterleitung, um Schema zu bearbeiten</h2>
                <button onClick={closeEditPopup} className="mt-4 bg-blue-500 text-white p-2 rounded">
                  Schließen
                </button>
              </div>
            )}

            {/* Schema löschen Button */}
            <button
              type="button"
              onClick={openDeletePopup}
              className={`mt-4 flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedSchema ? 'bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!selectedSchema}
            >
              Schema löschen
            </button>
            {isDeleteOpen && (
              <div 
                ref={deletePopupRef} 
                id="delete-popup" 
                style={{ top: deletePopupPos.top, left: deletePopupPos.left }}
                className="absolute bg-white shadow-lg rounded-lg p-4"
              >
                <h2>Schema löschen ist in der Demo deaktiviert</h2>
                <button onClick={closeDeletePopup} className="mt-4 bg-blue-500 text-white p-2 rounded">
                  Schließen
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="flex justify-between px-[5vw] gap-[5vw] w-full">
        {/* Zurück Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-[2vh] rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Zurück
        </button>

        {/* Weiter Button */}
        <button
          type="button"
          onClick={() => {
            console.log("Selected file:", selectedFile);
            console.log("Selected schema:", selectedSchema );
            navigate("/preview", { state: { selectedFile, selectedSchema } }); // Pass data to preview page
          }}
          className={`mt-[2vh] rounded-md w-[25vw] py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedFile && selectedSchema && helpType === "check"? 'bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!selectedFile || !selectedSchema || helpType !== "check"}
        >
          Weiter
        </button>
      </div>

    </div>
  );
}

export default Upload;

