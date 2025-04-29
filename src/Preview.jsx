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
import { StackedList } from "./StackedList";


export default function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, selectedSchema, generatedSchema } = location.state || {}; // Destructure the state
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const helpDialogRef = useRef();
  const uploadDialogRef = useRef();
  const checkboxDialogRef = useRef();
  const uploadFinishedDialogRef = useRef();


  const previewText = [
    {
      header: "Thema (Work in Progress)",
      text: "Wohnräume"
    },
    {
      header: "Tabellentransformation",
      text: selectedSchema?.name || (generatedSchema ? "Generiertes Schema" : "kein Schema ausgewählt")
    },
    {
     header: "Datei",
     text: selectedFile?.name || "keine Datei ausgewählt"
    },
  ]

  const computeTablelimit = () => {
    let limit = windowSize.height;
    limit = limit * 0.75 - 36; // 75% of screen - header row
    limit = limit / 32.4 - 2 ; // / row height - puffer
    return parseInt(limit);
  }

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
          //set amount of rows based on window height
          const limit = computeTablelimit();
          if(limit < 5) {limit = 5}
          const opts = {"limit" : limit};
          api.previewConvertTable(selectedFile, actualSchema, opts, (error, data, response) => {
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
      } catch(error) {
        console.error("Error during previewConvertTable:", error);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };


  {/* Send the converted table to the server, when the preview is good */ }
  const sendTableToServer = (schemaId) => {
    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new DefaultApi(client);
    const callback = function (error, data, response) {
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


  {/* Load json and check if hidePopup is set */}
  useEffect(() => {
    getPreview();
    const hidePopup = localStorage.getItem("hidePopup");
    if (hidePopup) {
      setDontShowAgain(true);
    }
  }, []);

  return (
<div>
      {/*Text and table */}
      <div className="flex flex-col h-[75vh]">
  
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
                sendTableToServer(schemaId);
                uploadFinishedDialogRef.current?.showModal();
            } catch (error) {
              console.log("error");
              errorDialogRef.current?.showModal();
            }
  
          }}
        />
  
        <UploadFinishedPopup  dialogRef={uploadFinishedDialogRef}/>
  
        <div className="flex justify-self-center ">
          {/* Information text */}
          <div className="flex flex-col mt-7 text-left flex-shrink-0">
          <p className="p-1 w-[15vw] text-md/6 font-semibold bg-white text-gray-900 border-t-2 border-l-2 border-r-2 border-solid border-gray-200 rounded-t-md">
            Vorschau
          </p>
            <StackedList headerTextArray={previewText}/>
          </div>
          {/* Table */}
          <div className="flex-1">
            {data.length ? (
              <TableFromJSON
                data={data}
              />
            ) : null}
          </div>
        </div>
        </div>
      {/* Buttons */}
      <div className="flex flex-row h-[10-vh]  px-[5vw] w-full py-[2vh] flex-shrink-0">
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