//import Table from "./Table"
import TableFromJSON from "./TableFromJSON";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ApiClient, DefaultApi } from "th1";
import Alert from "./Alert";
import Popup from "./Popup";
import HelpDialog from "./Popups/HelpDialog";
import UploadDialog from "./Popups/UploadDialog";
import CheckboxDialog from "./Popups/CheckBoxDialog";
import { HeartIcon } from "@heroicons/react/24/solid";
import UploadFinishedPopup from "./Popups/UploadFinishedPopup";
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import ErrorDialog from "./Popups/ErrorDialog";


export default function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, selectedSchema, generatedSchema } = location.state || {}; // Destructure the state
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showError, setShowError] = useState(false);
  const[errorText, setErrorText] = useState("");

  const helpDialogRef = useRef();
  const uploadDialogRef = useRef();
  const checkboxDialogRef = useRef();
  const uploadFinishedDialogRef = useRef();
  const errorDialogRef = useRef();

  const createDataObject = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    return formData;
  };

  {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async () => {
    console.log("Attempting to get a preview from the server");
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    if (!selectedSchema && !generatedSchema) {
      console.error("No schema selected");
      return;
    }

    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new DefaultApi(client);
    const fileToServer = createDataObject();
    if (!selectedFile) {
      console.error("Failed to create FormData object");
      return;
    }
    console.log("fileToServer: ", selectedFile);
    if (selectedSchema) {
      console.log("selectedSchema id: ", selectedSchema.id);
    } else if (generatedSchema) {
      console.log("generatedSchema id: ", generatedSchema.id);
    }

    let actualSchema;

    try {
      if (generatedSchema) {
        actualSchema = generatedSchema;
      } else if (selectedSchema) {
        actualSchema = await new Promise((resolve, reject) => {
          console.log('requested to get tablestructure from server')
          api.getTableStructure(selectedSchema.id, (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              console.log('API called to get tableStructure successfully. Returned data: ' + data);
              console.log('API response: ' + response);
              resolve(data);
            }
          });
        });

        if (!actualSchema) {
          console.error("Failed to get actual schema");
          return;
        }
      }

      console.log("actualSchema: ", actualSchema);
      try {
        await new Promise((resolve, reject) => {
          console.log("selectedFile: ", selectedFile);
          console.log("selectedFileType: ", selectedFile.type);
          api.previewConvertTable(selectedFile, actualSchema, undefined, (error, data, response) => {
            if (error) {
              console.error("error" + error)
              reject(error);
            } else {
              console.log('API called to get preview successfully to get preview. Returned data: ' + data);
              console.log('API response: ' + response);
              setData(data);
              resolve(data);
            }
          });
        });
      } catch {
        console.log("Error during previewConvertTable:");
      }
    } catch (error) {
      setErrorText(""+error);
      console.error("Error during API call:", error);
    }
  };

  
  {/* Send the converted table to the server, when the preview is good */ }
  const sendTableToServer = (schemaId) => {
    return new Promise((resolve, reject) => {
      const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
      const api = new DefaultApi(client);

      if (schemaId === null) {
        schemaId = selectedSchema.id;
      }

      console.log("schemaId " + schemaId);
      api.previewConvertTable(schemaId, selectedFile, (error, data, response) =>{
        if(error){
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  {/* Send the generated schema to the server (if a generated schema was used) */ }
  const sendGeneratedSchemaToServer = () => {
    if (!generatedSchema) {
      console.error("No generated schema to send");
      return null;
    }
    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new DefaultApi(client);
    return new Promise((resolve, reject) => {
      api.createTableStructure(generatedSchema, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          console.log('API called successfully. data: ', data);
          const id = data; // Assuming `response` contains the ID
          resolve(id);
        }
      });
    });
  }


  {/* lädt JSON aus Dateipfad und überprüft ob Popup angezeigt werden soll */}
  useEffect(() => {
    getPreview();
    const hidePopup = localStorage.getItem("hidePopup");
    if (hidePopup) {
      setDontShowAgain(true);
    }
  }, []);

  {/* Show error message after a short timeout */}
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-[85vh]">
      
      {/* Popups */}
      <HelpDialog dialogRef={helpDialogRef}/>

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
        onConfirm={async () => {
          checkboxDialogRef.current?.close(); 
          try {
            let schemaId = null;
            if (generatedSchema) {
                schemaId = await sendGeneratedSchemaToServer(); 
              }
              console.log(schemaId + "hallo")
              await sendTableToServer(schemaId);
              uploadFinishedDialogRef.current?.showModal();
          } catch (error) {
            setErrorText(""+error);
            errorDialogRef.current?.showModal();
          }
        }}
      />

      <UploadFinishedPopup  dialogRef={uploadFinishedDialogRef}/>

      <ErrorDialog
        text={"Upload fehlgeschlagen "}
        errorMsg = {""+errorText}
        onConfirm={() => {errorDialogRef.current?.close(); navigate("/");}}
        dialogRef={errorDialogRef}
      />
      
      <div className="flex-shrink-0">
        <Alert
          text={
            <>
              Ist die Tabelle korrekt umgewandelt? Wenn ja, klicken Sie auf fertigstellen, andernfalls gehen Sie zurück und passen Sie das Schema an!<br />
              - Alle Kategorien dürfen nur in der ersten Zeile auftauchen<br />
              - Es gibt keine komplett leeren Zeilen oder Spalten<br />
              - Korrekte Benennung der Spalten und inhaltlich korrekte Werte
            </>
          }
          type="info"
        />
      </div>
      <div className="flex flex-1 overflow-hidden gap-[2vw]">
        {/* Überschrift und Informationen zum Schema */}
        <div className="flex flex-col p-4 gap-4 text-left flex-shrink-0">
          <div className="flex justify-content-left text-lg font-semibold">Vorschau</div>
          <div className="flex flex-col items-start">
            <p className="text-base font-semibold">Thema (Work in Progress):</p>
            <p className="text-base font-normal">Wohnräume</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-base font-semibold">Schema:</p>
            <p className="text-base font-normal">{selectedSchema?.name || (generatedSchema ? "Generiertes Schema" : "kein Schema ausgewählt")}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-base font-semibold">Datei:</p>
            <p className="text-base font-normal max-w-[25vw]">{selectedFile?.name || "keine Datei ausgewählt"}</p>
          </div>
        </div>
        {/* Table with preview or error message */} 
        <div className="flex-1 overflow-auto">
          {
            data.length ? (
              <TableFromJSON
                data= {data}
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
                <p className="text-sm">{errorText}</p>
              </div>
              ) : null
          }
          </div>
        </div>
      {/* Knöpfe */}
      <div className="flex flex-row px-[5vw] w-full py-[2vh] flex-shrink-0">
        <div className="flex justify-start w-[35vw]">
          <button
            type="button"
            className="ml-[5vw] rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigate("/upload")}
          >
            Zurück
          </button>
          <button
            type="button"
            className="ml-[5vw] rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              helpDialogRef.current?.showModal();      
            }}
          >
            Hilfe
          </button>
        </div>

        <div className="flex justify-between w-[55vw]">
          <button
            type="button"
            className="mr-[5vw] rounded-md w-[25vw] py-2 text-sm font-semibold text-white shadow-sm bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed"
          >
            Schema anpassen
          </button>
          <button
            type="button"
            className="mr-[5vw] p-5 rounded-md bg-gray-600 w-[25vw] py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={ () => {
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