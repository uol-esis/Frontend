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
import { StackedList } from "./StackedList";
import keycloak from "./keycloak";

export default function Preview() {

  const isLoggedIn = useAuthGuard();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, selectedSchema, generatedSchema, editedSchema, showSuccessMessage } = location.state || {}; // Destructure the state
  const [showPPup, setShowPPup] = useState(false);
  const [data, setData] = useState([]);
  const actualSchemaRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const helpDialogRef = useRef();
  const uploadDialogRef = useRef();
  const checkboxDialogRef = useRef();
  const uploadFinishedDialogRef = useRef();
  const errorDialogRef = useRef();


  useEffect(() => {
    if (showSuccessMessage) {
      setShowPPup(true);
    }

  }, [showSuccessMessage]);
  const previewText = [
    {
      header: "Thema (Work in Progress)",
      text: "Wohnräume"
    },
    {
      header: "Tabellentransformation",
      text: selectedSchema?.name || generatedSchema?.name || editedSchema?.name
    },
    {
      header: "Datei",
      text: selectedFile?.name || "keine Datei ausgewählt"
    },
  ]

  const computeTablelimit = () => {
    let limit = windowSize.height;
    limit = limit * 0.75 - 36; // 75% of screen - header row
    limit = limit / 32.4 - 2; // / row height - puffer
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

  {/* Function to set the actual schema */ }
  const setActualSchema = async () => {
    console.log("Setting actual schema...");
    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const oAuth2Auth = client.authentications["oAuth2Auth"];
    oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
    const api = new DefaultApi(client);

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
              reject(error);
            } else {
              console.log("API called to get tableStructure successfully. Returned data: ", data);
              resolve(data);
            }
          });
        });

        if (!actualSchemaRef.current) {
          console.error("Failed to get actual schema");
          return;
        }
        console.log("Using selected schema: ", actualSchemaRef.current);
      }

      console.log("Actual schema set: ", actualSchemaRef.current);
    } catch (error) {
      console.error("Error during setActualSchema:", error);
    }
  };


  {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async () => {
    console.log("Attempting to get a preview from the server");
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    if (!actualSchemaRef.current) {
      console.error("No actual schema set");
      return;
    }

    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const oAuth2Auth = client.authentications["oAuth2Auth"];
    oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
    const api = new DefaultApi(client);

    try {
      await new Promise((resolve, reject) => {
        console.log("selectedFile: ", selectedFile);
        console.log("selectedFileType: ", selectedFile.type);
        //set amount of rows based on window height
        let limit = computeTablelimit();
        if (limit < 5) { limit = 5 }
        let opts = { "limit": limit };
        api.previewConvertTable(selectedFile, actualSchemaRef.current, opts, (error, data, response) => {
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
    } catch (error) {
      console.error("Error during previewConvertTable:", error);
    }
  };


  {/* Send the converted table to the server, when the preview is good */ }
  const sendTableToServer = (schemaId) => {
    return new Promise((resolve, reject) => {
      const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
      const oAuth2Auth = client.authentications["oAuth2Auth"];
      oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
      const api = new DefaultApi(client);

      if (schemaId === null) {
        schemaId = selectedSchema.id;
      }

      console.log("schemaId " + schemaId);
      api.convertTable(schemaId, selectedFile, undefined, (error, data, response) => {
        if (error) {
          console.error(error);
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
    const oAuth2Auth = client.authentications["oAuth2Auth"];
    oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
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

  const sendEditedSchemaToServer = () => {
    if (!editedSchema) {
      console.error("No generated schema to send");
      return null;
    }
    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const oAuth2Auth = client.authentications["oAuth2Auth"];
    oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
    const api = new DefaultApi(client);
    return new Promise((resolve, reject) => {
      api.createTableStructure(editedSchema, (error, data, response) => {
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

  {/* Show error message after a short timeout */ }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div>
      {/*Text and table */}
      <div className="flex flex-col h-[75vh]">

        {showPPup
          && (
            <div className="mt-4 mx-auto bg-green-100 border border-green-500 text-green-800 px-6 py-3 rounded shadow">
              Bearbeitung erfolgreich angewandt! Bitte überprüfen Sie die Vorschau und laden Sie die korrekte Datei hoch!        </div>
          )}
        {/* Popups */}
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
          onConfirm={async () => {
            checkboxDialogRef.current?.close();
            try {
              let schemaId = null;
              if (generatedSchema) {
                schemaId = await sendGeneratedSchemaToServer();
              } else if (editedSchema) {
                schemaId = await sendEditedSchemaToServer();
              }
              await sendTableToServer(schemaId);
              uploadFinishedDialogRef.current?.showModal();
            } catch (error) {
              console.log("catched");
              setErrorText(error.message);
              errorDialogRef.current?.showModal();
            }

          }}
        />

        <UploadFinishedPopup dialogRef={uploadFinishedDialogRef} />

        <ErrorDialog
          text={"Upload fehlgeschlagen "}
          errorMsg={""}
          onConfirm={() => { errorDialogRef.current?.close(); navigate("/"); }}
          dialogRef={errorDialogRef}
        />

        {/* Information text */}
        <div className="flex justify-self-center ">

          <div className="flex flex-col mt-7 text-left flex-shrink-0">
            <p className="p-1 w-[15vw] text-md/6 font-semibold bg-white text-gray-900 border-t-2 border-l-2 border-r-2 border-solid border-gray-200 rounded-t-md">
              Vorschau
            </p>
            <StackedList headerTextArray={previewText} />
          </div>
          {/* Table with preview or error message */}
          <div className="flex-1 overflow-auto">
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
              ) : null
            }
          </div>
        </div>
      </div>
      {/* Buttons */}
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
            className="mr-[5vw] rounded-md w-[25vw] py-2 text-sm font-semibold text-white shadow-sm bg-gray-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
            onClick={handleEditSchema}
          >
            Schema anpassen
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