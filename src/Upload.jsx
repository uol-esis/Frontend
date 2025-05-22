import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ConfirmNameDialog from "./Popups/ConfirmNameDialog";
import UploadComponent from "./UploadComponent";
import SchemaList from "./SchemaList";
import GenerateSchemaComponent from "./GenerateSchemaComponent";

import Alert from "./Alert";

function Upload() {
  const [schemaList, setSchemaList] = useState([
    { name: "Schema 1", description: "Description for Schema 1" },
    { name: "Schema 2", description: "Description for Schema 2" },
    { name: "Schema 3", description: "Description for Schema 3" }
  ]); // Default for the list of schemata
  const [Th1, setTh1] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validFile, setValidFile] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [schemaName, setSchemaName] = useState("");
  const [jsonData, setJsonData] = useState(null);

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
    console.log("try to generate");
    const client = new Th1.ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new Th1.DefaultApi(client);
    // 
    const callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully to generate a schema.');
        console.log("Selected file:", selectedFile);
        console.log("Generated schema:", data); // or data
        //show ConfirmNameModal
        setJsonData(data);
        setSchemaName(data.name);
        confirmNameToPreviewRef.current?.showModal();
      }
    };
    api.generateTableStructure(selectedFile, callback);
  }

  {/* Confirm name and navigate to preview page*/ }
  const confirmGeneratedName = function (newName) {
    jsonData.name = newName;
    const cleaned = JSON.parse(JSON.stringify(jsonData));
    navigate("/preview", { state: { selectedFile, generatedSchema: cleaned } }) // or data // Pass data to preview page
  };

  const handleConfirm = () => navigate("/preview", { state: { selectedFile, selectedSchema } }); //name-popup to preview

 const handleAddSchema = () => {
        setSchemaName(selectedFile.name);
        confirmNameToEditRef.current?.showModal();
      };

  const schemaBlockClass = validFile ? "" : "opacity-50 pointer-events-none";

  {/* Actual page */ }
  return (
    <div className="flex p-2 space-y-6 mx-2 my-5 ">

      {/* Popup */}
      <ConfirmNameDialog dialogRef={confirmNameToPreviewRef} name={schemaName} onCLickFunction={confirmGeneratedName}/>

      <ConfirmNameDialog dialogRef={confirmNameToEditRef} name={schemaName} onCLickFunction={() => console.log("go to edit")}/>

      {/* Container: File Upload + Schema (left, right) */}
      <div className="flex flex-col lg:flex-row justify-center lg:space-x-8 space-y-4 lg:space-y-0 mx-15">
        {/*Left Upload */}
        <UploadComponent setFile={setSelectedFile} setValid={setValidFile} />

        {/* Right Up, Down */}
        <div className={`flex flex-col space-y-6 w-full lg:w-2/3 ${schemaBlockClass}`}>
          <SchemaList list={schemaList} setSchema={setSelectedSchema} file={selectedFile} handleConfirm={handleConfirm} handlePlus={handleAddSchema}/>

          {/* Down new scheme */}
          <GenerateSchemaComponent fileIsValid={validFile} onGenerate={generateNewSchema}/>
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