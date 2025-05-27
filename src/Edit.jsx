import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConverterCard from "./components/ConverterCard";

import { ApiClient, DefaultApi } from "th1";


export default function Edit() {
  // Liste aller Cards (mit initialer Start-Card)
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, schemaToEdit } = location.state || {}; // Daten von der vorherigen Seite (Upload)
  const [cards, setCards] = useState([{id: 0, label: "Start", parameters: [{name:'Start'}], isEditing: false}]); //Wir beginnen immer mit der Startcard
  const [cardIdCounter, setCardIdCounter] = useState(1); //gewünschter ID State
  const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });


  const handleConverterClick = (label, params, converterType) => {
    const newCard = {id: cardIdCounter, label: label, parameters: params, converterType: converterType, selectedFile: selectedFile, isEditing: true}; //Neue Card mit ID, label, Parametern, und converterType
    setCards([newCard, ...cards]); //Neue Card wird an den Anfang der Liste gesetzt
    setCardIdCounter(cardIdCounter + 1); 
  }

  const converters = [
    {label: 'Gruppenüberschriften entfernen ', params: [ {name: 'Zeilennummer', type: 'number', required: true, apiName: 'rowIndex'}, {name: 'Spaltennummer', type: 'number', required: true, apiName: 'columnIndex'}, {name:'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name: 'Startspalte', type: 'number', required: false, apiName: 'startColumn'}], converterType: 'REMOVE_GROUPED_HEADER' }, //RemoveGroupedHeader
    {label: 'Leere Zeilen ausfüllen ', params: [{name: 'Zeilennummer', type:'number', required: true, apiName: 'rowIndex'}], converterType: 'FILL_EMPTY_ROW' }, //FillEmptyRows
    {label: 'Spalte entfernen (nach Index) ', params: [{name: 'Spaltennummer', type: 'numer', required: true, apiName: 'columnIndex'}], converterType: 'REMOVE_COLUMN_BY_INDEX'},//RemoveColumnByIndex
    {label: 'Spaltenüberschriften hinzufügen ', params: [{name: 'Überschriftenliste (Kommagetrennt)', required: true, apiName: 'headerNames'}], converterType: 'ADD_HEADER_NAME'}, //AddHeaderNames
    {label: 'Fußzeile entfernen ', params: [{name:'Treshold', type: 'number', required: false, apiName: 'threshold'}, {name:'Blacklist', required: false, apiName: 'blacklist'}], converterType: 'REMOVE_FOOTER'}, //RemoveFooter
    {label: 'Kopfzeile entfernen ', params: [{name: 'Treshold', type: 'number', required: false, apiName: 'threshold'}, {name: 'Blacklist', required: false, apiName: 'blacklist'}], converterType: 'REMOVE_HEADER'}, //RemoveHeader
    {label: 'Einträge ersetzen ', params: [ {name: 'Suchbegriff', required: false, apiName: 'search'}, {name: 'Regex', required: false, apiName: 'regexSearch'}, {name: 'Ersetzen durch: ', required: true, apiName: 'replacement'},{name: 'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name: 'Startspalte', type: 'number', required: false, apiName: 'startColumn'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'}, {name: 'Endspalte', type: 'number', required: false, apiName: 'endColumn'} ], converterType: 'REPLACE_ENTRIES'}, //ReplaceEntries
    {label: 'Zeile aufteilen ', params: [{name:'Spaltenindex', type: 'number', required: true, apiName: 'columnIndex'}, {name: 'Trennzeichen', required: false, apiName: 'delimiter'}, {name:'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'}], converterType: 'SPLIT_ROW'}, //SplitRow
    {label: 'Ungültige Zeilen entfernen ', params: [{name:'Treshold', apiName: 'threshold'}, {name: 'Blacklist', apiName: 'blacklist'}], converterType: 'REMOVE_INVALID_ROWS'}, //RemoveInvalidRows
    {label: 'Nachträgliche Spalten entfernen ', params: [{name:'Treshold', apiName: 'threshold'}, {name:'Blacklist', apiName: 'blacklist'}], converterType: 'REMOVE_TRAILING_COLUMNS'}, //RemoveTrailingColumns

    // weitere Converter hier hinzufügen
  ];

  useEffect(() => {  
    if (schemaToEdit) {
      console.log("selectedfile:", selectedFile);
      console.log("Schema to edit:", schemaToEdit);
      initializeCardsFromSchema(schemaToEdit);
    }
    
    // Call getPreview with an empty JSON structure for the Start card
    const fetchStartCardPreview = async () => {
      const emptyJson = {
        name: "Start Preview",
        structures: [],
        endRow: null,
        endColumn: null,
      };
  
      const previewData = await getPreview(emptyJson);
      if (previewData) {
        console.log("Preview Data for Start Card:", previewData);
  
        // Update the Start card with the preview data
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === 0 ? { ...card, preview: previewData } : card
          )
        );
      }
    };
  
    fetchStartCardPreview();
  }, [schemaToEdit]);


  // Funktion um Cards aus einem zu bearbeitendem Schema zu initialisieren
  const initializeCardsFromSchema = async (schema) => {
    if (!schema || !schema.structures) return;
  
    const newCards = schema.structures.map((structure, index) => {
      const converterType = structure.converterType; // Extract the converterType directly
      if (!converterType) {
        console.warn(`Structure at index ${index} is missing converterType.`);
        return null;
      }
      
      const converter = converters.find((conv) => conv.converterType === converterType);
      if (!converter) {
        console.warn(`No matching converter found for type: ${structure.converterType}`);
        return null;
      }
  
      // Map the structure's inputs to formData
      const formData = {};
      converter.params.forEach((param) => {
        formData[param.apiName] = structure[param.apiName] || ""; // Use apiName to map values
      });
  
      return {
        id: index + 1, // Assign a unique ID
        label: converter.label,
        parameters: converter.params,
        converterType: converter.converterType,
        formData: formData, // Pre-fill formData
        selectedFile: selectedFile, // Include the selected file if needed
        isEditing: true, 
      };
    }).filter(Boolean); // Remove null values
  
    const allCards = [...newCards.reverse(), { id: 0, label: "Start", parameters: [{ name: "Start" }] }];
    setCards(allCards);
    setCardIdCounter(newCards.length + 1); // Update the card ID counter
  };


  const handleSaveFromCard = async (cardId, formData) => {
    console.log(`Data saved from card ${cardId}:`, formData);
  
    // Update the cards state with the formData for the saved card
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, formData, isEditing: false };
        } else if (card.id > cardId) {
          return { ...card, isEditing: true, preview: null };
        }
        return card;
      });
    
      // Generate the JSON for the saved card and its predecessors
      const filteredCards = updatedCards.filter((card) => card.id <= cardId && card.id !== 0).reverse();
    
      const structures = filteredCards.map((card) => {
        const inputs = card.parameters.reduce((acc, param) => {
          const apiName = param.apiName;
          const value = card.formData?.[param.apiName] || "";
          acc[apiName] = value;
          return acc;
        }, {});
    
        return {
          converterType: card.converterType,
          ...inputs,
        };
      });
    
      const jsonData = {
        name: "Example Name",
        structures: structures,
        endRow: null,
        endColumn: null,
      };
    
      console.log("Generated JSON:", JSON.stringify(jsonData, null, 2));
    
      // Call getPreview and update the card with the preview data
      getPreview(jsonData).then((previewData) => {
        if (previewData) {
          console.log("Preview Data:", previewData);
    
          setCards((latestCards) =>
            latestCards.map((card) =>
              card.id === cardId ? { ...card, preview: previewData } : card
            )
          );
        }
      });
      return updatedCards;
    });
  };

  const handleEditToggle = (cardId, isEditing) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isEditing } : card
      )
    );
  }; 


  const computeTablelimit = () => {
    let limit = windowSize.height;
    limit = limit * 0.75 - 36; // 75% of screen - header row
    limit = limit / 32.4 - 2 ; // / row height - puffer
    return parseInt(limit);
  }


  {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async (jsonData) => {
    console.log("Attempting to get a preview from the server");
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const client = new ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const api = new DefaultApi(client);   
    
    try {
      const data= await new Promise((resolve, reject) => {
        console.log("selectedFile: ", selectedFile);
        console.log("selectedFileType: ", selectedFile.type);
        //set amount of rows based on window height
        let limit = computeTablelimit();
        if(limit < 5) {limit = 5}
        let opts = {"limit" : limit};
        api.previewConvertTable(selectedFile, jsonData, opts, (error, data, response) => {
          if (error) {
            console.error("error" + error)
            reject(error);
          } else {
            console.log('API called to get preview successfully to get preview. Returned data: ' + data);
            console.log('API response: ' + response);
            resolve(data);
          }
        });
      });
      return data;
    } catch(error) {
      console.error("Error during previewConvertTable:", error);
      return null;
    }
  };


  const handleEditComplete = () => {
    // Check if any card is still in editing mode
    const unsavedCards = cards.filter((card) => card.isEditing);
    if (unsavedCards.length > 0) {
      alert("Bitte speichern Sie zuerst alle Karten.");
      return; // Prevent proceeding if there are unsaved cards
    }

    // Generate the final JSON structure from all cards
    const structures = cards.reverse().filter(card => card.id !== 0).map(card => {
      const inputs = card.parameters.reduce((acc, param) => {
        acc[param.apiName] = card.formData?.[param.apiName] || "";
        return acc;
      }, {});
      return {
        converterType: card.converterType,
        ...inputs,
      };
    });

    const jsonData = {
      name: "Final Schema",
      structures: structures,
      endRow: null,
      endColumn: null,
    };

    console.log("Final JSON to send:", JSON.stringify(jsonData, null, 2));

    // Send the final JSON to the server or handle it as needed
    // For now, just navigate back to the home page
    navigate("/preview", {
      state: { 
        selectedFile: selectedFile, 
        editedSchema: jsonData 
      }
    }
    );
  }

  return (
    <div className="pb-20 "> {/* pb-20 damit der Footer nicht überlappt. */}

      {/* Seitenüberschrift */}
      <h1 className="text-3xl font-bold mb-3 text-left p-4">{selectedFile?.name}</h1>

      <div className="flex gap-8">
        
        {/* Linke Spalte: Converter-Buttons */}
        <div className="w-1/5 space-y-2 pl-4">
          {converters.map((conv) => (
            <button
              key={conv.label}
              onClick={() => handleConverterClick(conv.label, conv.params, conv.converterType)}
              className="w-full text-left px-4 py-2 bg-gray-600 hover:bg-indigo-500 text-white rounded-lg shadow"
            >
              {conv.label}
            </button>
          ))}
        </div>
        
        {/* Rechte Spalte: Cards */}
        <div className="w-3/4 space-y-4 px-20">
          {cards.map((card) => (
            console.log("Card:", card),
            <ConverterCard 
              key={card.id} 
              id={card.id} 
              label={card.label} 
              parameters={card.parameters} 
              converterType={card.converterType} 
              formData={card.formData} 
              preview={card.preview || []} 
              isEditing={card.isEditing}
              onSave={handleSaveFromCard}
              onEditToggle={handleEditToggle}
              cards={cards}
            />
          ))}
        </div>

        <button 
          className="fixed bottom-10 right-4 bg-gray-600 hover:bg-indigo-500 text-white px-2 py-2 mb-2 rounded shadow "
          onClick={handleEditComplete}
        >Anwenden</button> 
        {/* apiapiapiapiapi */}
      </div>
    </div>
  );
}
