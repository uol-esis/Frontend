//import Table from "./Table"
import TableFromJSON from "./TableFromJSON";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiClient, DefaultApi } from "th1";
import Alert from "./Alert";
import Popup from "./Popup";

export default function Preview(){
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, selectedSchema, generatedSchema } = location.state || {}; // Destructure the state
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // State to control the popup visibility

  const createDataObject = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    return formData;
  };

  {/* If a file and schema are selected, sends them to the server to get a preview*/}
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
    
    const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
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
      try{
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
      console.error("Error during API call:", error);
    }
  };
  

  {/* Send the converted table to the server, when the preview is good */}
  const sendTableToServer = (schemaId) =>{
    const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
    const api = new DefaultApi(client);
    const callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully.');
      }
    };
    if (schemaId === null) {
      schemaId = selectedSchema.id
    }
    console.log(schemaId)
    api.convertTable(schemaId, selectedFile, callback);
  }

  {/* Send the generated schema to the server (if a generated schema was used) */}
  const sendGeneratedSchemaToServer = () => {
    if (!generatedSchema) {
      console.error("No generated schema to send");
      return null;
    }
    const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
    const api = new DefaultApi(client);
    return new Promise((resolve, reject) => {
      api.createTableStructure(generatedSchema, (error, data, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log('API called successfully. data: ', data);
          const id = data; // Assuming `response` contains the ID
          resolve(id);
        }
      });
    });
  }


  {/* lädt JSON aus Dateipfad */}
  useEffect(() => {
    getPreview();
  }, []);


  return (
    <div className="flex flex-col h-[85vh]">
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
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
        {/* Tabelle mit Vorschau */}
        <div className="flex-1 overflow-auto">
          {data.length ? (
            <TableFromJSON
              data={data}
            />
          ) : null}
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
              setShowPopup(true);
              localStorage.setItem("hidePopup", false);
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
            className="mr-[5vw] rounded-md bg-gray-600 w-[25vw] py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              let schemaId = null;
              if (generatedSchema) {
                schemaId = await sendGeneratedSchemaToServer(); 
              }
              console.log(schemaId + "hallo")
              sendTableToServer(schemaId);
              navigate("/");
            }}
          >
            Hochladen
          </button>
        </div>
      </div>
    </div>
  );
}