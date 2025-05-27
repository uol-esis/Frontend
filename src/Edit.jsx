import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConverterCard from "./components/ConverterCard";

export default function Edit() {
  // Liste aller Cards (mit initialer Start-Card)
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, schemaToEdit } = location.state || {}; // Daten von der vorherigen Seite (Upload)
  const [cards, setCards] = useState([{id: 0, label: "Start", parameters: [{name:'Start'}]}]); //Wir beginnen immer mit der Startcard
  const [cardIdCounter, setCardIdCounter] = useState(1); //gewünschter ID State

  const handleConverterClick = (label, params, converterType) => {
    const newCard = {id: cardIdCounter, label: label, parameters: params, converterType: converterType}; //Neue Card mit ID, label, Parametern, und converterType
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
    {label: 'Einträge ersetzen ', params: [ {name: 'Suchbegriff', required: true, apiName: 'search'}, {name: 'Ersetzen durch: ', required: true, apiName: 'replacement'},{name: 'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name: 'Startspalte', type: 'number', required: false, apiName: 'startColumn'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'}, {name: 'Endspalte', type: 'number', required: false, apiName: 'endColumn'} ], converterType: 'REPLACE_ENTRIES'}, //ReplaceEntries
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
  }, [schemaToEdit]);

  // Funktion um Cards aus einem zu bearbeitendem Schema zu initialisieren
  const initializeCardsFromSchema = (schema) => {
    if (!schema || !schema.structures) return;
  
    const newCards = schema.structures.map((structure, index) => {
      const actualInstance = structure.getActualInstance(); // Extract the actualInstance object
      // Skip the structure if actualInstance is undefined
      if (!actualInstance) {
        console.warn(`Structure at index ${index} is missing actualInstance.`);
        return null;
      }
      
      const converter = converters.find((conv) => conv.converterType === structure.converterType);
  
      if (!converter) {
        console.warn(`No matching converter found for type: ${structure.converterType}`);
        return null;
      }
  
      // Map the structure's inputs to formData
      const formData = {};
      converter.params.forEach((param) => {
        formData[param.apiName] = actualInstance[param.apiName] || ""; // Use apiName to map values
      });
  
      return {
        id: index + 1, // Assign a unique ID
        label: converter.label,
        parameters: converter.params,
        converterType: converter.converterType,
        formData: formData, // Pre-fill formData
      };
    }).filter(Boolean); // Remove null values
  
    setCards([...newCards.reverse(), { id: 0, label: "Start", parameters: [{ name: "Start" }] }]);
    setCardIdCounter(newCards.length + 1); // Update the card ID counter
  };

  const handleSaveFromCard = (cardId, formData) => {
    console.log(`Data saved from card ${cardId}:`, formData);
  
    // Update the cards state with the formData for the saved card
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === cardId ? { ...card, formData } : card
      );
  
      // Filter all cards with id less than or equal to the current cardId, excluding "Start" (id === 0)
      const filteredCards = updatedCards.filter((card) => card.id <= cardId && card.id !== 0);
  
      // Collect data from all filtered cards
      const structures = filteredCards.map((card) => {
        const cardTitle = card.converterType; // Use the label as the title
        const inputs = card.parameters.reduce((acc, param) => {
          const apiName = param.apiName;
          const value = card.formData?.[param.name] || ""; // Get the value from formData using the parameter name
          acc[apiName] = value; // Use apiName as the key
          return acc;
        }, {});
  
        return {
          converterType: cardTitle,
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
  
      return updatedCards; // Return the updated cards to update the state
    });
  };


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
            <ConverterCard key={card.id} id={card.id} label={card.label} parameters={card.parameters} converterType={card.converterType} formData={card.formData} onSave={handleSaveFromCard}/>
          ))}
        </div>


        <button className="fixed bottom-10 right-4 bg-gray-600 hover:bg-indigo-500 text-white px-2 py-2 mb-2 rounded shadow ">Anwenden</button> 
        {/* apiapiapiapiapi */}
      </div>
    </div>
  );
}
