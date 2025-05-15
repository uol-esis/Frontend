import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ApiClient, DefaultApi } from "th1";
import React, { useState } from "react";
import ConverterCard from "./components/ConverterCard";


function Edit() {
  const navigate = useNavigate();
  const { selectedFile } = location.state || {}; // Destructure the state

  // Liste aller Cards (mit initialer Start-Card)
  const [cards, setCards] = useState([{id: 0, parameters: [{name:'Start'}]}]); //Wir beginnen immer mit der Startcard

  const [cardIdCounter, setCardIdCounter] = useState(1); //gewünschter ID State

  const handleConverterClick = (params) => {
    const newCard = {id: cardIdCounter, parameters: params}; //Neue Card mit ID und Parametern
    setCards([newCard, ...cards]); //Neue Card wird an den Anfang der Liste gesetzt
    setCardIdCounter(cardIdCounter + 1); 
  }

  const converters = [
    { label: 'Gruppenüberschriften entfernen 🧹', params: [ {name: 'Zeilennummer', type: 'number', required: true}, {name: 'Spaltennummer', type: 'number', required: true}, {name:'Startzeile', type: 'number', required: false}, {name: 'Startspalte', type: 'number', required: false}] }, //RemoveGroupedHeader
    { label: 'Leere Zeilen ausfüllen ➕', params: [{name: 'Zeilennummer', type:'number', required: true}] }, //FillEmptyRows
    {label: 'Spalte entfernen (nach Index) ❌', params: [{name: 'Spaltennummer', type: 'numer', required: true}]},//RemoveColumnByIndex
    {label: 'Spaltenüberschriften hinzufügen 🏷️', params: [{name: 'Überschriftenliste (Kommagetrennt)', required: true}]}, //AddHeaderNames
    {label: 'Fußzeile entfernen 📥 ', params: [{name:'Treshold', type: 'number', required: false}, {name:'Blacklist', required: false}]}, //RemoveFooter
    {label: 'Kopfzeile entfernen 📋 ', params: [{name: 'Treshold', type: 'number', required: false}, {name: 'Blacklist', required: false}]}, //RemoveHeader
    {label: 'Einträge ersetzen 🔄', params: [ {name: 'Suchbegriff', required: false}, {name: 'Regex', required: false}, {name: 'Ersetzen durch: ', required: true},{name: 'Startzeile', type: 'number', required: false}, {name: 'Startspalte', type: 'number', required: false}, {name:'Endzeile', type: 'number', required: false}, {name: 'Endspalte', type: 'number', required: false} ]}, //ReplaceEntries
    {label: 'Zeile aufteilen ✂️ ', params: [{name:'Spaltenindex', type: 'number', required: true}, {name: 'Trennzeichen', required: false}, {name:'Startzeile', type: 'number', required: false}, {name:'Endzeile', type: 'number', required: false}]}, //SplitRow
    {label: 'Ungültige Zeilen entfernen 🚫', params: [{name:'Treshold'}, {name: 'Blacklist'}]}, //RemoveInvalidRows
    {label: 'Nachträgliche Spalten entfernen 🧽', params: [{name:'Treshold'}, {name:'Blacklist'}]}, //RemoveTrailingColumns

    // weitere Converter hier hinzufügen
  ];



  // Create refs for the boxes
  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  const thirdBoxRef = useRef(null);

  {/* When the JSON is created, sends it and the file to the server to get a preview*/ }
  {/*const getPreview = async () => {
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
  */}

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
    <div className="pb-20 "> {/* pb-20 damit der Footer nicht überlappt. */}

      {/* Seitenüberschrift */}
      <h1 className="text-3xl font-bold mb-3 text-left p-4">Hier wird der Name des Schemas als Überschrift übergeben</h1>

      <div className="flex gap-8">
        
        {/* Linke Spalte: Converter-Buttons */}
        <div className="w-1/5 space-y-2 pl-4">
          {converters.map((conv) => (
            <button
              key={conv.label}
              onClick={() => handleConverterClick(conv.params)}
              className="w-full text-left px-4 py-2 bg-gray-600 hover:bg-indigo-500 text-white rounded-lg shadow"
            >
              {conv.label}
            </button>
          ))}
        </div>

        {/* Rechte Spalte: Cards */}
        <div className="w-3/4 space-y-4 px-20">
          {cards.map((card) => (
            <ConverterCard key={card.id} id={card.id} parameters={card.parameters} />
          ))}
        </div>


        <button className="fixed bottom-10 right-4 bg-gray-600 hover:bg-indigo-500 text-white px-2 py-2 mb-2 rounded shadow ">Anwenden</button> 
        {/* apiapiapiapiapi */}
      </div>
    </div>
  );
}
