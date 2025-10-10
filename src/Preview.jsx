//import Table from "./Table"
import TableFromJSON from "./TableFromJSON";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ApiClient, DefaultApi } from "th1";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Alert from "./Alert";
import Popup from "./Popup";
import HelpDialog from "./Popups/HelpDialog";
import UploadDialog from "./Popups/UploadDialog";
import CheckboxDialog from "./Popups/CheckBoxDialog";
import { HeartIcon } from "@heroicons/react/24/solid";
import UploadFinishedPopup from "./Popups/UploadFinishedPopup";
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import ErrorDialog from "./Popups/ErrorDialog";
import { StackedList } from "./StackedList";
import keycloak from "./keycloak";
import { useAuthGuard } from "./hooks/AuthGuard";
import { getApiInstance } from "./hooks/ApiInstance";
import { StackedListDropDown } from "./components/StackedListDropDown";
import { parseReports } from "./hooks/ReadReports";
import DecisionDialog from "./Popups/DecisionDialog";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "./ToolTip";
import Spinner from "./components/Spinner";

export default function Preview() {

  const isLoggedIn = useAuthGuard();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, selectedSchema, generatedSchema, editedSchema, showSuccessMessage, reports } = location.state || {}; // Destructure the state
  const [showPPup, setShowPPup] = useState(false);
  const [data, setData] = useState([]);
  const actualSchemaRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorId, setErrorId] = useState("none");
  const [errorMsg, setErrorMsg] = useState("");
  const [globalSchemaId, setGlobalSchemaId] = useState("");
  const [reportContent, setReportContent] = useState([]);
  const [existReports, setExistReports] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [tipInformation, setTipInformation] = useState(false);
  const [tipTable, setTipTable] = useState(false);
  const [tipButtons, setTipButtons] = useState(false);

  const helpDialogRef = useRef();
  const uploadDialogRef = useRef();
  const checkboxDialogRef = useRef();
  const uploadFinishedDialogRef = useRef();
  const errorDialogRef = useRef();
  const decisionDialogRef = useRef();

  const previewText = [
    {
      header: "Tabellentransformation",
      text: selectedSchema?.name || generatedSchema?.name || editedSchema?.name
    },
    {
      header: "Datei",
      text: selectedFile?.name || "keine Datei ausgewählt"
    },
  ]

  /* -------------- Tutorial ------------------------ */

  const ExplainerInformationText = (
    <span> 
      Hier wird die vorher ausgewählte Datei und Tabellentransformation angezeigt. 
      Falls vorhanden werden außerdem Warnungen bzw. Fehler angezeigt die beim Generieren aufgetreten sind. 
    </span>
  )

  const ExplainerTable = (
    <span> 
      In diesem Bereich wird die Tabelle nach Anwendung der Tabellentransformation angezeigt. 
      Es soll überprüft werden, ob die Daten korrekt sind und ob die Tabelle datenbankkonform ist ( 
      <span 
        onClick={() => { window.open("/wiki?targetId=database", "_blank");}} 
        className="text-blue-400 underline cursor-pointer"
      >
        siehe Wiki
      </span>).
    </span>
  )

  const ExplainerButtons = (
    <span> 
      Hier kann die Tabellentransformation angepasst werden, dabei kann die Struktur als auch der Inhalt der Tabelle verändert werden. 
      Außerdem kann die Tabelle hochgeladen werden, damit sie in Metabase zur Visualisierung verfügbar ist.
    </span>
  )

  const TipInformationToTable = function () {
    setTipInformation(false);
    setTipTable(true);
  }

  const TipTableToButtons = function () {
    setTipTable(false);
    setTipButtons(true);
  }

  /* ----------------- Helper functions  ----------------------*/

  //show message if you edited the schema on the edit page
  useEffect(() => {
    if (showSuccessMessage) {
      setShowPPup(true);
    }
  }, [showSuccessMessage]);

  {/* Show error message after a short timeout */ }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    readReports();
  }, []);

  useEffect(() => {
    if (showSuccessMessage) {
      setShowPPup(true);
    }

  }, [showSuccessMessage]);

  const computeTablelimit = () => {
    let limit = windowSize.height;
    limit = limit * 0.75 - 36; // 75% of screen - header row
    limit = limit / 32.4 - 3; // / row height - puffer
    return parseInt(limit);
  }

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
      console.log("error 0");
      setErrorId("0");
    }
    if(currentErrorId == errorId){
      errorDialogRef.current?.showModal();
    }
    setShowError(true);
  }

    const getSchemaIdByName = async (name) => {

    let {api} = await getApiInstance();
    return new Promise((resolve, reject) => {
      api.getTableStructures((error, response) => {
        if (error) {
          console.error(error);
          parseError(error);
          reject(error);
        } else {
          console.log("Response:", response);
          const schema = response.find(schema => schema.name === name);
          resolve(schema ? schema.id : null);
        }
      });
    });
};

/* -------------- reports ------------------ */

  const readReports = async () => {
    if(!reports){
      console.log("no reports");
      return;
    }

    const array = [];
    console.log("reports " + JSON.stringify( reports));
    await parseReports(reports, array);

    if(array.length == 0){
      setExistReports(false);
    }else setExistReports(true);
    
    setReportContent(array);
    
  }

  /* ------------------- schema handling ------------------ */

  {/* Function to set the actual schema */ }
  const setActualSchema = async () => {
    console.log("Setting actual schema...");
    const {api} = await getApiInstance();

    try {
      if (generatedSchema) {
        console.log("Using generated schema: ", generatedSchema);
        actualSchemaRef.current = generatedSchema;
      } else if (editedSchema) {
        console.log("Using edited schema: ", editedSchema);
        actualSchemaRef.current = editedSchema;
      } else if (selectedSchema) {
        actualSchemaRef.current = await new Promise((resolve, reject) => {
          console.log("Requested to get table structure from server");
          api.getTableStructure(selectedSchema.id, (error, data, response) => {
            if (error) {
              console.error(error);
              parseError(error);
              reject(error);
            } else {
              console.log("API called to get tableStructure successfully. Returned data: ", data);
              resolve(data);
            }
          });
        });

        if (!actualSchemaRef.current) {
          console.error("Failed to get actual schema");
          setErrorId("101");
          return;
        }
        console.log("Using selected schema: ", actualSchemaRef.current);
      }
      
      console.log("Actual schema set: ", actualSchemaRef.current);
    } catch (error) {
      console.error("Error during setActualSchema:", error);
      setErrorId("101");
    }
  };


  {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async () => {
    
    console.log("Attempting to get a preview from the server");
    if (!selectedFile) {
      console.error("No file selected");
      setErrorId("103");
      return;
    }
    if (!actualSchemaRef.current) {
      console.error("No actual schema set");
      setErrorId("101");
      return;
    }

    const {api} = await getApiInstance();
      await new Promise((resolve, reject) => {
        console.log("selectedFile: ", selectedFile);
        console.log("selectedFileType: ", selectedFile.type);
        //set amount of rows based on window height
        let limit = computeTablelimit();
        if (limit < 5) { limit = 5 }
        let opts = { "limit": limit };
        api.previewConvertTable(selectedFile, actualSchemaRef.current, opts, (error, data, response) => {
          if (error) {
            console.error(error)
            parseError(error);
            reject(error);
          } else {
            console.log('API called to get preview successfully to get preview. Returned data: ' + data);
            setData(data);
            resolve(data);
          }
        });
      });
  };

  {/* Send the generated schema to the server (if a generated schema was used) */ }
  const sendGeneratedSchemaToServer = async () => {
    if (!generatedSchema) {
      console.error("No generated schema to send");
      setErrorId("101");
      return null;
    }
    
    const {api, Th1} = await getApiInstance();
    return new Promise((resolve, reject) => {
      api.createTableStructure(generatedSchema, (error, data, response) => {
        try{
          if (error) {
            const errorObj = JSON.parse(error.message);
            if(errorObj.status == "409"){
              setErrorId(errorObj.status + "CreateTableStructure");
            }else setErrorId(errorObj.status);
            
            reject(error);
          } else {
            console.log('API called successfully. data: ', data);
            const id = data; // Assuming `response` contains the ID
            resolve(id);
          }
        }catch(error){
          console.error(error);
          parseError(error);
        }
        
      });
    });
  }

    //only used if schema is selected from schemalist in upload
  const sendEditedSchemaToServer = async () => {
    if (!editedSchema) {
      console.error("No generated schema to send");
      setErrorId("101");
      return null;
    }
    
    const {api} = await getApiInstance();
    return new Promise((resolve, reject) => {
      api.createTableStructure(editedSchema, (error, data, response) => {
        try{
          if (error) {
            const errorObj = JSON.parse(error.message);
            if(errorObj.status == "409"){
              setErrorId(errorObj.status + "CreateTableStructure");
            }else setErrorId(errorObj.status);
            reject(error);
          } else {
            console.log('API called successfully. data: ', data);
            const id = data; // Assuming `response` contains the ID
            resolve(id);
          }
        }catch(error){
          console.error(error);
        }
        
      });
    });
  }

  const updateTableStructure = async (schemaId) => {
    const {api} = await getApiInstance();
    console.log("schemaId " + schemaId);
    console.log("actualSchemaRef " + JSON.stringify(actualSchemaRef.current));
    return new Promise((resolve, reject) => {
      api.updateTableStructure(schemaId, actualSchemaRef.current, (error, data, response) => {
        if (error) {
          console.error(error);
          parseError(error);
        } else {
          console.log('API called successfully.');
          uploadFinishedDialogRef.current?.showModal();
        }
      });
    } )
  }

  {/* Load the schema and check if hidePopup is set */ }
  useEffect(() => {
    const initialize = async () => {
      await setActualSchema(); // Set the actual schema first
      if (actualSchemaRef.current) {
        await getPreview(); // Call getPreview only if the schema is set
      }
    };

    initialize();

    const hidePopup = localStorage.getItem("hidePopup");
    if (hidePopup) {
      setDontShowAgain(true);
    }
  }, []);

  const handleEditSchema = () => {
    const serializableSchema = JSON.parse(JSON.stringify(actualSchemaRef.current));

    navigate("/edit", {
      state: {
        selectedFile: selectedFile,
        schemaToEdit: serializableSchema,
      },
    });
  }

  /* ----------- table handling ---------------- */

  {/* Send the converted table to the server, when the preview is good */ }
  const sendTableToServer = async (schemaId) => {
    const {api} = await getApiInstance();
    return new Promise((resolve, reject) => {

      if (schemaId === null) {
        schemaId = selectedSchema.id;
      }

      api.convertTable(schemaId, selectedFile, undefined, (error, data, response) => {
        try{
           if (error) {
            console.error(error);
            const errorObj = JSON.parse(error.message);
            if(errorObj.status == "409"){
              decisionDialogRef.current?.showModal();
              resolve("decision");
            }else{
              setErrorId(errorObj.status);
              reject(error);
            }
          } else {
            resolve(data);
          }
        }catch(error){
          console.error(error);
          parseError(error);
        }
       
      });
    });
  }

  const replaceTableInServer = (schemaId) => {
    //if schema is not generated, get id from selected schema
    if(!schemaId) schemaId = actualSchemaRef.current.id;

    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const oAuth2Auth = client.authentications["oAuth2Auth"];
    oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
    const api = new DefaultApi(client);

    let opts = {
      'mode': "'REPLACE'"
    };

    api.convertTable(schemaId, selectedFile, opts, (error, data, response) => {
      if (error) {
        console.error(error);
        parseError(error);
        decisionDialogRef.current?.close();

      } else {
        decisionDialogRef.current?.close();
        uploadFinishedDialogRef.current?.showModal();
        console.log('Table successfully replaced.');
      }
    });
  }

  /* --------------- handle upload --------------------- */

  const handleCheckBoxConfirm = async () =>{
    let schemaId = null;
    checkboxDialogRef.current?.close();
    let schemaName = "";
    try {
      if (generatedSchema) {
        schemaName = generatedSchema.name;
        schemaId = await sendGeneratedSchemaToServer();
      } else if (editedSchema) {
        schemaName = editedSchema.name;
        schemaId = await sendEditedSchemaToServer();
      }
      
      setGlobalSchemaId(schemaId);
      const result = await sendTableToServer(schemaId);
      if(result == "decision"){
        //file already exists in database
        decisionDialogRef.current?.showModal();
      }else{
        uploadFinishedDialogRef.current?.showModal();
      }
      
    } catch (error) {
      const errorObj = JSON.parse(error.message);
        if(errorObj.status === 409){
          //update tablestructure if name is already taken
          const id = await getSchemaIdByName(schemaName);
          updateTableStructure(id);
        }else{
          parseError(error);
          console.error(error);
        }
      }
  }

/* ------------- Actual page ---------------- */
  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div className="relative">
      {/*Text and table */}
      <div className="flex flex-col h-[75vh]">

        {showPPup
          && (
            <div className="mt-4 mx-auto bg-green-100 border border-green-500 text-green-800 px-6 py-3 rounded shadow">
              Bearbeitung erfolgreich angewandt! Bitte überprüfen Sie die Vorschau und laden Sie die korrekte Datei hoch!        </div>
          )}
        {/* Popups */}
          <DecisionDialog
            dialogRef={decisionDialogRef}
            text={"Die Datei befindet sich bereits in der Datenbank. Es gibt die Möglichkeit die Datei zu ersetzen oder das Hochladen abzubrechen."}
            label1={"Datei ersetzen"}
            function1={() => {replaceTableInServer(globalSchemaId)}}
            label2={"Hochladen abbrechen"}
            function2={() => navigate("/upload")}
          />

        <HelpDialog dialogRef={helpDialogRef} />

        <UploadDialog
          dialogRef={uploadDialogRef}
          dontShowAgain={dontShowAgain}
          setDontShowAgain={setDontShowAgain}
          nextDialogRef={checkboxDialogRef}
        />

        <CheckboxDialog
          dialogRef={checkboxDialogRef}
          allCheck={allCheck}
          setAllCheck={setAllCheck}
          onConfirm={handleCheckBoxConfirm}
        />

        <UploadFinishedPopup dialogRef={uploadFinishedDialogRef} />

        <ErrorDialog
          text={"Fehler!"}
          errorId={errorId}
          message={errorMsg}
          onConfirm={() => { errorDialogRef.current?.close();}}
          dialogRef={errorDialogRef}
        />

       
        <div className="flex justify-self-center h-[70vh] ">
        {/* Information text */}
          <div className="relative">
            <div className="flex flex-col gap-4 p-4 mt-7 text-left flex-shrink-0 overflow-auto">
              <StackedListDropDown title={"Vorschau"} headerTextArray={previewText} />
              <StackedListDropDown title={"Fehlermeldungen"} headerTextArray={reportContent} isImportant={existReports} />
            </div>
            <div className="absolute  top-0 left-full z-20">
              <Tooltip tooltipContent={ExplainerInformationText} onClick={TipInformationToTable} direction={"left"} showTutorial={tipInformation} />
            </div>
          </div>
          {/* Table with preview or error message */}
          <div className="flex-1 overflow-auto mt-5 relative">
            <div className="absolute  top-1/5 left-1/4 z-20 w-150">
              <Tooltip tooltipContent={ExplainerTable} onClick={TipTableToButtons} direction={"bottom"} showTutorial={tipTable} />
            </div>
            {
              data.length ? (
                <TableFromJSON
                  data={data}
                />
              ) : showError ? (
                <div>
                  <div className="flex justify-center mt-[20vh]">
                    <div className="shrink-0">
                      <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-yellow-800">Tabelle konnte nicht geladen werden</h3>
                    </div>
                  </div>
                  {/*<p className="text-sm">{errorText}</p>*/}
                </div>
              ) : 
            
              <div>
                  <div className="flex justify-center mt-[20vh]">
                    <div className="shrink-0 w-16 h-16">
                     <Spinner/>
                    </div>
                  </div>
                </div>
          
            }
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-row px-[5vw] w-full py-[2vh] flex-shrink-0 ">
          <div className="absolute w-150 left-1/3 bottom-1/6 z-20">
              <Tooltip tooltipContent={ExplainerButtons} onClick={() => {setTipInformation(false); setTipTable(false); setTipButtons(false);}} direction={"bottom"} showTutorial={tipButtons} />
            </div>

        <div className="flex justify-start w-[35vw]">
          <button
            type="button"
            className="absolute top-3 left-3 z-10 pb-2"
            onClick={() => navigate("/upload")}
          >
            <ArrowLeftCircleIcon className="h-7 w-7 text-gray-600  hover:text-indigo-500" />
          </button>

          <button
            type="button"
            className="absolute top-3 right-3 z-10"
            onClick={() => {
              setTipInformation(true); setTipTable(false); setTipButtons(false);
            }}
          >
            <QuestionMarkCircleIcon className="h-7 w-7 text-gray-600 hover:text-indigo-500"/>
          </button>
        </div>

        <div className="flex justify-between w-[55vw]">
          <button
            type="button"
            className="mr-[5vw] rounded-md w-[25vw] py-2 text-sm font-semibold text-white shadow-sm bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
            onClick={handleEditSchema}
          >
            Tabellentransformation anpassen
          </button>
          <button
            type="button"
            className="mr-[5vw] p-5 rounded-md bg-gray-600 w-[25vw] py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              if (!dontShowAgain) {
                uploadDialogRef.current?.showModal();
              } else checkboxDialogRef.current?.showModal();
            }}
          >
            Hochladen
          </button>
        </div>
      </div>
    </div>
  );
}