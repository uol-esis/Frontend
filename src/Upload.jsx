import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ConfirmNameDialog from "./Popups/ConfirmNameDialog";
import UploadComponent from "./UploadComponent";
import SchemaList from "./SchemaList";
import GenerateSchemaComponent from "./GenerateSchemaComponent";
import Tooltip from "./ToolTip";

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

  const[tipDate, setTipData] = useState(false);
  const[tipSchema, setTipSchema] = useState(false);
  const[tipGenerate, setTipGenerate] = useState(false);

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

  useEffect(() => {
    const dontShowAgain = localStorage.getItem("hideUploadTutorial");
    if(dontShowAgain){
      return;
    }
    setTipData(true);
    localStorage.setItem("hideUploadTutorial", true);
  });

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

  const handleConfirm = () => navigate("/preview", { state: { selectedFile, selectedSchema } }); //name-popup to preview

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //noch ausfüllen
  const handleAddSchema = () => {
    setSchemaName(selectedFile.name);
    confirmNameToEditRef.current?.showModal();
  };
    const handleConfirmNewSchema = () => {
        navigate("/edit", {
            state: {
                selectedFile: selectedFile,
            },
        });
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

  const schemaBlockClass = validFile ? "" : "opacity-50 pointer-events-none";

  {/* Actual page */ }
  return (
    <div className="flex flex-col h-[80vh] w-full gap-1 p-3">
      {/* Popup */}
        <ConfirmNameDialog dialogRef={confirmNameToPreviewRef} name={schemaName} onCLickFunction={confirmGeneratedName}/>
        <ConfirmNameDialog dialogRef={confirmNameToEditRef} name={schemaName} onCLickFunction={() => handleConfirmNewSchema()}/>
      {/* Go back and Tutorial */}
      <div className="flex justify-between">
          <button
            type="button"
            className=""
            onClick={() => navigate("/")}
          >
            <ArrowLeftCircleIcon className="h-7 w-7 text-gray-600  hover:text-indigo-500"/>
          </button>

          <button
            type="button"
            className=""
            onClick={() => setTipData(true)}
          >
            <QuestionMarkCircleIcon className="h-7 w-7 text-gray-600 hover:text-indigo-500"/>
          </button>
      </div>

      {/* Upload, Schemalist and Generate */}
      <div className="flex w-full h-full gap-4 ">

        {/* Upload */}
        <div className="reflex flex-col w-1/3 relative">
            <UploadComponent setFile={setSelectedFile} setValid={setValidFile} />
            <div className="absolute bottom-0 left-0">
              <Tooltip tooltipContent={ExplainerUpload} showTutorial={tipDate} direction={"top"} onClick={TipDataToSchema}/>
            </div>
        </div>

          {/* Schemalist and Generate */}
          <div className={`flex flex-col space-y-6 w-full h-full`}>

            {/* Schemalist*/}
            <div className="relative h-full min-h-0">
              <div className={`h-full ${schemaBlockClass}`}>
                <SchemaList list={schemaList} setSchema={setSelectedSchema} file={selectedFile} handleConfirm={handleConfirm} handlePlus={handleAddSchema}/>
              </div>
              <div className="absolute -left-1/5 top-1/2 -translate-y-1/2  w-[15vw]">
                <Tooltip tooltipContent={ExplainerSchemalist} showTutorial={tipSchema} direction={"right"} onClick={TipSchemaToGenerate}/>
              </div>
           </div>

            {/* Generate */}
            <div className="relative">
              <div className={`${schemaBlockClass}`}>
                <GenerateSchemaComponent fileIsValid={validFile} onGenerate={generateNewSchema}/>
              </div>
                <div className="absolute left-1/2 top-0 -translate-y-full -translate-x-1/2">
                    <Tooltip tooltipContent={ExplainerGenerate} showTutorial={tipGenerate} direction={"bottom"} onClick={() => setTipGenerate(false)}/>
                </div>
              </div>

          </div>

      </div>

    </div>
  );
}

export default Upload;