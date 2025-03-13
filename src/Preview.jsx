//import Table from "./Table"
import TableFromJSON from "./TableFromJSON";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiClient, DefaultApi } from "th1";
import Alert from "./Alert";

export default function Preview(){
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, selectedSchema } = location.state || {}; // Destructure the state
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);

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
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    if (!selectedSchema) {
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
    console.log("selectedSchema id: ", selectedSchema.id);

    try {
      const actualSchema = await new Promise((resolve, reject) => {
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
  
      await new Promise((resolve, reject) => {
        console.log("selectedFile: ", selectedFile);
        console.log("selectedFileType: ", selectedFile.type);
        api.previewConvertTable(selectedFile, actualSchema, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            console.log('API called to get preview successfully. Returned data: ' + data);
            console.log('API response: ' + response);
            resolve(data);
            setData(data);
          }
        });
      });
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  

  {/* Send the converted table to the server, when the preview is good */}
  const sendTableToServer = () =>{
    const client = new ApiClient("https://pg-doener-dev.virt.uni-oldenburg.de/v1");
    const api = new DefaultApi(client);
    const callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully.');
      }
    };
    api.convertTable(selectedSchema.id, selectedFile, callback);
  }


  {/* lädt JSON aus Dateipfad */}
  useEffect(() => {
    getPreview();
  }, []);


  return(
    <div>
      <Alert text={
        <>
          Achten Sie bei der Vorschau auf folgende Aspekte:<br />
          - Alle Kategorien sollten in der ersten Zeile auftauchen und es gibt keine verschachtelten Zeilen oder Spalten<br />
          - Korrekte Benennung der Spalten und inhaltlich korrekte Werte
        </>
      }
      type="info" />
      <div className="flex gap-[2vw]">
        {/* Überschrift und Informationen zum Schema */}
        <div className="flex flex-col p-4 gap-4 text-left">
          <div className="flex justify-content-left text-lg font-semibold">Vorschau</div>
            <div className="flex flex-col items-start">
              <p className="text-base font-semibold">Thema (Work in Progress):</p>
              <p className="text-base font-normal">Wohnräume</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-base font-semibold">Schema:</p>
              <p className="text-base font-normal">{selectedSchema?.name || "kein Schema ausgewählt"}</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-base font-semibold">Datei:</p>
              <p className="text-base font-normal max-w-[25vw]">{selectedFile?.name || "keine Datei ausgewählt"}</p>
            </div>
        </div>
        {/* Tabelle mit Vorschau */}
        {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
        {data.length ? (
          <TableFromJSON
            data={data}
          />
        ) : null}
      </div>

      {/* Knöpfe */}
      <div className="flex justify-between p-4 mt-2.5">
        <button
          type="button"
          className="mt-[2vh] rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => navigate("/upload")}
        >
          Zurück
        </button>
        <button
          type="button"
          className="mt-[2vh] rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={sendTableToServer}
        >
          Anwenden
        </button>
      </div>
    </div>
    
  );
}