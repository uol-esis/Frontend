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
import ErrorDialog from "./Popups/ErrorDialog";
import DecisionDialog from "./Popups/DecisionDialog";

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
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [schemaIsSelected, setSchemaIsSelected] = useState(false);

  const [tipDate, setTipData] = useState(false);
  const [tipSchema, setTipSchema] = useState(false);
  const [tipGenerate, setTipGenerate] = useState(false);

  const confirmNameRef = useRef();
  const errorDialogRef = useRef();
  const confirmDeleteRef = useRef();

  const [confirmMode, setConfirmMode] = useState(null); // "preview" or "edit"

  const navigate = useNavigate();

  /* ------------- Tutorials ------------------- */

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

/* --------------- Schema List Component --------------------- */

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

  const handleAddSchema = () => {
    setSelectedSchema(null);
    setSchemaName(selectedFile.name);
    setConfirmMode("edit");

    confirmNameRef.current?.showModal();
  };

  const handleDeleteSchema = async (id) => {
      const {api} = await getApiInstance();
      if(!id){
        setErrorId(0);
      }

      api.deleteTableStructure(id, (error, data, response) => {
        if (error) {
          parseError(error);
          console.error(error);
        } else {
          console.log('API called successfully.');
          getSchemaList();
        }
      });
    };

/* -------------- Generation ------------------------ */
{/* Generate a new Schema for the selected File */ }
  const generateNewSchema = async function () {
    setSelectedSchema(null);
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

/* -------------- Helper functions ----------------- */

{/* get schemalist from api */}
  useEffect(() => {
    if (isLoggedIn) {
      getSchemaList();
    }
  }, []);

  //save selected schema
  useEffect(() => {
    console.log("selected " + JSON.stringify(selectedSchema));
    if(selectedSchema){
      setSchemaIsSelected(true);
    }else{
      setSchemaIsSelected(false);
    }
  }, [selectedSchema]);

  //save if tutorial is displayed at start
  useEffect(() => {
    const dontShowAgain = localStorage.getItem("hideUploadTutorial");
    if (dontShowAgain) {
      return;
    }
    setTipData(true);
    localStorage.setItem("hideUploadTutorial", true);
  });

  
  useEffect(() => {
      if(errorId == "none"){
        return;
      }
      errorDialogRef.current?.showModal();
    }, [errorId]);

  const parseError = (error) => {
    let currentErrorId = errorId;
    try{
      const errorObj = JSON.parse(error.message);
      if(errorObj.status){
        setErrorId(errorObj.status);
        setErrorMsg(errorObj.detail);
      }else{
        setErrorId("0");
      }
    }catch{
      setErrorId("0");
    }
    if(currentErrorId == errorId){
      errorDialogRef.current?.showModal();
    }
  }

  const isNameTaken = function (newName) {
    let selectedSchemaName = "";
    if(selectedSchema){
      selectedSchemaName = selectedSchema.name;
    }

    for (const schema of schemaList) {
      if (schema.name === newName && schema.name != selectedSchemaName) {
        return true;
      }
    }
    return false;
  }

  /* -------------- confirm name popup --------------- */

  const handleConfirmName = async (newFileName, newTransformationName) => {
  if (isNameTaken(newTransformationName)) {
    setConfirmNameError("Der Name wird bereits verwendet");
    return false;
  }

  // Neuer File mit geändertem Namen
  const updatedFile = new File([selectedFile], newFileName, { type: selectedFile.type });

  // State aktualisieren und sicherstellen, dass es gesetzt ist
  await new Promise((resolve) => {
    setSelectedFile(updatedFile);
    setTimeout(resolve, 0); // kleiner Hack, um State-Sync zu erzwingen
  });

  // Transformation setzen
  if(jsonData){
    jsonData.name = newTransformationName;
  }

  if (confirmMode === "preview") {
    const generatedSchemaJson = JSON.parse(JSON.stringify(jsonData));
    const reportsJson = JSON.parse(JSON.stringify(reports));
    navigate("/preview", {
      state: { selectedFile: updatedFile, generatedSchema: generatedSchemaJson, reports: reportsJson },
    });
  } else if (confirmMode === "edit") {
    const schema = { name: newTransformationName };
    navigate("/edit", {
      state: { schemaToEdit: schema, selectedFile: updatedFile },
    });
  } else if (confirmMode === "Readyprev") {
    navigate("/preview", {
      state: { selectedFile: updatedFile, generatedSchema: selectedSchema },
    });
  }

  setConfirmMode(null);
  return true;
};

  // Öffnet das ConfirmNameDialog bevor zur Preview navigiert wird (nur bei Klick auf "Weiter")
  const handleConfirm = () => {
    setConfirmMode("Readyprev");
    setConfirmNameError("");
    confirmNameRef.current?.showModal();
  };

  /* ----------------- Actual page -------------------- */ 
  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div className="flex flex-col h-[80vh] w-full gap-1 p-3">
      {/* Popup */}
      <DecisionDialog dialogRef={confirmDeleteRef} text={"Möchten Sie die Tabellentransformation wirklich unwiderruflich löschen?"}  label1={"Ja"} function1={() => {handleDeleteSchema(idToDelete); confirmDeleteRef.current?.close();}} label2={"Nein"} function2={() => {confirmDeleteRef.current?.close()}} />

      <ConfirmNameDialog
        dialogRef={confirmNameRef}
        name={schemaName}
        file={selectedFile}
        onClickFunction={handleConfirmName}
        errorText={confirmNameError} 
        useExistingSchema={schemaIsSelected}
      />
        
      <ErrorDialog
        text={"Fehler!"}
        errorId={errorId}
        message={errorMsg}
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
              <SchemaList list={schemaList} setSchema={setSelectedSchema} setSchemaName={setSchemaName} file={selectedFile} handleConfirm={handleConfirm} handlePlus={handleAddSchema} handleDeleteSchema={handleDeleteSchema} setId={setIdToDelete} deleteDialogRef={confirmDeleteRef} />
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