import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ApiClient, DefaultApi } from "th1";


function Edit() {
  const navigate = useNavigate();
  const { selectedFile } = location.state || {}; // Destructure the state


  // Create refs for the boxes
  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  const thirdBoxRef = useRef(null);

  {/* When the JSON is created, sends it and the file to the server to get a preview*/ }
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
  

  // Generic function to handle inputs dynamically
  const getCurrentTable = function (boxElement) {
    
    const boxId = +boxElement.id; // Convert to number

    const allBoxes = [firstBoxRef.current, secondBoxRef.current, thirdBoxRef.current];
    const filteredBoxes = allBoxes.filter((box) => +box.id <= boxId);
    
    // Collect data from all filtered boxes
    const structures = filteredBoxes.map((box) => {
      const boxTitle = box.querySelector("h2").textContent;
      const inputs = Array.from(box.querySelectorAll("input")).reduce((acc, input) => {
        const inputName = input.getAttribute("data-name");
        const inputValue = input.value;
        acc[inputName] = inputValue;
        return acc;
      }, {});

      return {
        converterType: boxTitle,
        ...inputs,
      };
    });

    // Construct the JSON object
    const jsonData = {
      name: "Example Name", // Replace with a dynamic name if needed
      structures: structures,
      endRow: null,
      endColumn: null,
    };

    console.log("Generated JSON:", JSON.stringify(jsonData, null, 2));
  };

  return (
    <div className="flex flex-col justify-between h-[85vh] bg-gray-100 p-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Edit Page</h1>
      </div>

      {/* White Boxes */}
      <div className="flex flex-col gap-4 flex-grow justify-center">
        {/* First Box */}
        <div id="1" className="bg-white p-4 rounded-lg shadow" ref={firstBoxRef}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            First Box Title
          </h2>
          <input
            type="text"
            placeholder="Enter your name"
            data-name="name"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => getCurrentTable(firstBoxRef.current)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Submit First Box
          </button>
        </div>

        {/* Second Box */}
        <div id="2" className="bg-white p-4 rounded-lg shadow" ref={secondBoxRef}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Second Box Title
          </h2>
          <input
            type="text"
            placeholder="Enter your age"
            data-name="age"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter your city"
            data-name="city"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => getCurrentTable(secondBoxRef.current)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Submit Second Box
          </button>
        </div>

        {/* Third Box */}
        <div id="3" className="bg-white p-4 rounded-lg shadow" ref={thirdBoxRef}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Third Box Title
          </h2>
          <input
            type="text"
            placeholder="Enter your email"
            data-name="email"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            data-name="phone"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter your address"
            data-name="address"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => getCurrentTable(thirdBoxRef.current)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Submit Third Box
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => navigate("/previous")}
        >
          Back
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => navigate("/next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Edit;