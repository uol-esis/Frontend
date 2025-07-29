import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ConfirmNameDialog from "./Popups/ConfirmNameDialog";
import UploadComponent from "./UploadComponent";
import SchemaList from "./SchemaList";
import GenerateSchemaComponent from "./GenerateSchemaComponent";
import Tooltip from "./ToolTip";
import { getApiInstance } from "./hooks/ApiInstance";
import { useAuthGuard } from "./hooks/AuthGuard";
import { div } from "framer-motion/client";


function Upload() {

  const isLoggedIn = useAuthGuard();
  
  const [schemaList, setSchemaList] = useState([
    { name: "Schema 1", description: "Description for Schema 1" },
    { name: "Schema 2", description: "Description for Schema 2" },
    { name: "Schema 3", description: "Description for Schema 3" }
  ]); // Default for the list of schemata
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [schemaName, setSchemaName] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [reports, setReports] = useState(null);
  const [isValidFile, setIsValidFile] = useState(false);
  const fileInputRef = useRef(null); // Reference for the hidden input element
  const [confirmNameError, setConfirmNameError] = useState();

  const [tipDate, setTipData] = useState(false);
  const [tipSchema, setTipSchema] = useState(false);
  const [tipGenerate, setTipGenerate] = useState(false);

  const confirmNameToPreviewRef = useRef();
  const confirmNameToEditRef = useRef();
  const navigate = useNavigate();


  const ExplainerUpload = (
    <span>Zuerst muss eine Datei ausgewählt werden, die hochgeladen werden soll. Es können nur Excel oder CSV Datein ausgewählt werden.</span>
  )

  const ExplainerSchemalist = (
    <span> Nach dem eine Datei ausgewählt wurde, kann diese in eine bestehende Tabellentransformation geladen werden oder eine Neue erstellt werden.</span>
  )

  const ExplainerGenerate = (
    <span>Alternativ kann hier eine neue Tabellentransformation automatisch generiert werden. </span>
  )

  const TipDataToSchema = function () {
    setTipData(false);
    setTipSchema(true);
  }

  const TipSchemaToGenerate = function () {
    setTipSchema(false);
    setTipGenerate(true);
  }

{/* get schemalist from api */}
  useEffect(() => {
    if (isLoggedIn) {
      getSchemaList();
    }
  }, [isLoggedIn]);
  

  useEffect(() => {
    const dontShowAgain = localStorage.getItem("hideUploadTutorial");
    if (dontShowAgain) {
      return;
    }
    setTipData(true);
    localStorage.setItem("hideUploadTutorial", true);
  });

  const getByteSize = (str) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    return encoded.length;
  };

  useEffect(() => {
    if (selectedFile && getByteSize(selectedFile.name) > 63) {
      setModifiedFileName(selectedFile.name); // Set the initial name
      fileNameDialogRef.current?.showModal(); // Open the popup
    }
  }, [selectedFile]);


  useEffect(() => {
    if (selectedFile) {
      const isValid = selectedFile.name.endsWith(".csv") || selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls");
      const isValidAndShortEnough = isValid && getByteSize(selectedFile.name) <= 63;
      setIsValidFile(isValidAndShortEnough);
    } else {
      setIsValidFile(false);
    }
  }, [selectedFile]);

  const getSchemaList = async function () {
    const {api} = await getApiInstance();
    api.getTableStructures((error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Response:", response);
        setSchemaList(response);
      }
    });
  }

  {/* Generate a new Schema for the selected File */ }
  const generateNewSchema = async function () {
    const {api, Th1} = await getApiInstance();
    if (!api ) {
      console.error("api is not loaded yet.");
      return;
    }
  
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
        setReports(data.reports);
        setJsonData(data.tableStructure);
        setSchemaName(selectedFile.name);
        confirmNameToPreviewRef.current?.showModal();
      }
      console.log(response);
    };
    api.generateTableStructure(selectedFile, settings, callback);
  }

  const isNameTaken = function (newName) {
    for (const schema of schemaList) {
      if (schema.name === newName) {
        return true;
      }
    }
    return false;
  }

  {/* Confirm name and navigate to preview page*/ }
  const confirmGeneratedName = function (newName) {
    
    if(isNameTaken(newName)){
      setConfirmNameError("Der Name wird bereits verwendet");
      return;
    }

    jsonData.name = newName;
    const generatedSchemaJson = JSON.parse(JSON.stringify(jsonData));
    const reportsJson = JSON.parse(JSON.stringify(reports));
    navigate("/preview", { state: { selectedFile, generatedSchema: generatedSchemaJson, reports: reportsJson } }) // or data // Pass data to preview page
  };

  {/* helper functions */ }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };


  const handleAddSchema = () => {
    setSchemaName(selectedFile.name);
    confirmNameToEditRef.current?.showModal();
  };

  const handleConfirmNewSchema = (newName) => {
    const schema = {
      name: newName
    };
    navigate("/edit", {
      state: {
        schemaToEdit: schema,
        selectedFile: selectedFile,
      },
    });
  };

  const handleConfirm = () => navigate("/preview", { state: { selectedFile, selectedSchema } }); //name-popup to preview

  {/* Actual page */ }
  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div className="flex flex-col h-[80vh] w-full gap-1 p-3">
      {/* Popup */}
      <ConfirmNameDialog dialogRef={confirmNameToPreviewRef} name={schemaName} errorText={confirmNameError} onClickFunction={confirmGeneratedName} />
      <ConfirmNameDialog dialogRef={confirmNameToEditRef} name={schemaName} errorText={confirmNameError} onClickFunction={handleConfirmNewSchema} />

      {/* Go back and Tutorial */}
      <div className="flex justify-between">
        <button
          type="button"
          className=""
          onClick={() => navigate("/")}
        >
          <ArrowLeftCircleIcon className="h-7 w-7 text-gray-600  hover:text-indigo-500" />
        </button>

        <button
          type="button"
          className=""
          onClick={() => { setTipData(true); setTipSchema(false); setTipGenerate(false); }}
        >
          <QuestionMarkCircleIcon className="h-7 w-7 text-gray-600 hover:text-indigo-500" />
        </button>
      </div>

      {/* Upload, Schemalist and Generate */}
      <div className="flex w-full h-full gap-4 ">

        {/* Upload */}
        <div className="reflex flex-col w-1/3 relative">
          <UploadComponent setFile={setSelectedFile} setValid={setIsValidFile} />
          <div className="absolute bottom-0 left-0">
            <Tooltip tooltipContent={ExplainerUpload} showTutorial={tipDate} direction={"top"} onClick={TipDataToSchema} />
          </div>
        </div>

        {/* Schemalist and Generate */}
        <div className={`flex flex-col space-y-6 w-full h-full ${isValidFile ? "" : "opacity-50 pointer-events-none"}`}>

          {/* Schemalist*/}
          <div className="relative h-full min-h-0">
            <div className={`h-full ${isValidFile ? "" : "opacity-50 pointer-events-none"}`}>
              <SchemaList list={schemaList} setSchema={setSelectedSchema} file={selectedFile} handleConfirm={handleConfirm} handlePlus={handleAddSchema} />
            </div>
            <div className="absolute -left-1/5 top-1/2 -translate-y-1/2  w-[15vw] pointer-events-auto"
              style={{ opacity: 1 }}
            >
              <Tooltip tooltipContent={ExplainerSchemalist} showTutorial={tipSchema} direction={"right"} onClick={TipSchemaToGenerate} />
            </div>
          </div>

          {/* Generate */}
          <div className="relative">
            <div className={`${isValidFile ? "" : "opacity-50 pointer-events-none"}`}>
              <GenerateSchemaComponent fileIsValid={isValidFile} onGenerate={generateNewSchema} />
            </div>
            <div className="absolute left-1/2 top-0 -translate-y-full -translate-x-1/2 pointer-events-auto"
              style={{ opacity: 1 }}
            >
              <Tooltip tooltipContent={ExplainerGenerate} showTutorial={tipGenerate} direction={"bottom"} onClick={() => setTipGenerate(false)} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Upload;