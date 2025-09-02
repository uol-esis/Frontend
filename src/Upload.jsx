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
import ErrorDialog from "./Popups/ErrorDialog";

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
  const [confirmNameError, setConfirmNameError] = useState("");
  const [errorId, setErrorId] = useState("none");
  const [isLoading, setIsLoading] = useState(false);

  const [tipDate, setTipData] = useState(false);
  const [tipSchema, setTipSchema] = useState(false);
  const [tipGenerate, setTipGenerate] = useState(false);

  const confirmNameToPreviewRef = useRef(); //NICHT VERW
  const confirmNameToEditRef = useRef(); //NICHT VERW
  const confirmNameRef = useRef();
  const errorDialogRef = useRef();

  const [confirmMode, setConfirmMode] = useState(null); // "preview" or "edit"

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
      if(errorId == "none"){
        return;
      }
      errorDialogRef.current?.showModal();
    }, [errorId]);

  const getSchemaList = async function () {
    const {api} = await getApiInstance();
    api.getTableStructures((error, response) => {
      if (error) {
        console.error(error);
        parseError(error);
      } else {
        console.log("Response:", response);
        setSchemaList(response);
      }
    });
  }

  const parseError = (error) => {
    let currentErrorId = errorId;
    try{
      const errorObj = JSON.parse(error.message);
      setErrorId(errorObj.status);
    }catch{
      setErrorId("0");
    }
    if(currentErrorId == errorId){
      errorDialogRef.current?.showModal();
    }
  }

  {/* Generate a new Schema for the selected File */ }
  const generateNewSchema = async function () {
    setIsLoading(true);
    const {api, Th1} = await getApiInstance();
    if (!api ) {
      console.error("api is not loaded yet.");
      setErrorId(100);
      return;
    }
  
    const settings = new Th1.TableStructureGenerationSettings(); 
    const callback = function (error, data, response) {
      if (error) {
        parseError(error);
        console.error(error);
        
      } else {
        console.log('API called successfully to generate a schema.');
        console.log("Selected file:", selectedFile);
        console.log("Generated schema:", data); // or data

        //show ConfirmNameModal
        setReports(data.reports);
        setJsonData(data.tableStructure);
        setSchemaName(selectedFile.name);
        setConfirmMode("preview");
        confirmNameRef.current?.showModal();
      }
      setIsLoading(false);
      console.log(response);
    };

    api.generateTableStructure(selectedFile, settings, {}, callback);
    
  }

  const isNameTaken = function (newName) {
    for (const schema of schemaList) {
      if (schema.name === newName) {
        return true;
      }
    }
    return false;
  }

  {/* Confirm name and navigate to preview page NICHTVER*/ }
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

  const handleAddSchema = () => {
    setSchemaName(selectedFile.name);
    setConfirmMode("edit");
    confirmNameRef.current?.showModal();
  };

  const handleConfirmName = (newName) => {
    if (isNameTaken(newName)) {
      setConfirmNameError("Der Name wird bereits verwendet");
      return;
    }

    if (confirmMode === "preview") {
      jsonData.name = newName;
      const generatedSchemaJson = JSON.parse(JSON.stringify(jsonData));
      const reportsJson = JSON.parse(JSON.stringify(reports));
      navigate("/preview", { state: { selectedFile, generatedSchema: generatedSchemaJson, reports: reportsJson } });
    } else if (confirmMode === "edit") {
      const schema = {
        name: newName };
      navigate("/edit", {
        state: {
          schemaToEdit: schema, selectedFile },
      });
    }
    setConfirmMode(null);
  };

  const handleConfirmNewSchema = (newName) => { //NICHT VERW
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
      <ConfirmNameDialog
        dialogRef={confirmNameRef}
        name={schemaName}
        onClickFunction={handleConfirmName}
        errorText={confirmNameError} />
      <ErrorDialog
        text={"Fehler!"}
        errorId={errorId}
        onConfirm={() => { errorDialogRef.current?.close(); }}
        dialogRef={errorDialogRef}
      />

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
        <div className={`flex flex-col space-y-6 w-full h-full `}>

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
              <GenerateSchemaComponent fileIsValid={isValidFile} onGenerate={generateNewSchema} isLoading={isLoading} />
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