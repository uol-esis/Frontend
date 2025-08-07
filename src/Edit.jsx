import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConverterCard from "./components/ConverterCard";
import { useAuthGuard } from "./hooks/AuthGuard";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "./ToolTip";
import keycloak from "./keycloak";
import { ApiClient, DefaultApi } from "th1";
import { getApiInstance } from "./hooks/ApiInstance";


export default function Edit() {
  
  const isLoggedIn = useAuthGuard();
  
  // Liste aller Cards (mit initialer Start-Card)
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFile, schemaToEdit } = location.state || {}; // Daten von der vorherigen Seite (Upload)
  const [cards, setCards] = useState([{ id: 0, label: "Start", parameters: [{ name: 'Start' }], isEditing: false }]); //Wir beginnen immer mit der Startcard
  const [cardIdCounter, setCardIdCounter] = useState(1); //gewünschter ID State
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [showConverterListTip, setShowConverterListTip] = useState(false);
  const [showCardListTip, setShowCardListTip] = useState(false);
  const tutorialRef = useRef();

  

  const ExplainerConverterList = (
    <span>Hier sind alle Converter, die auf die Tabelle angewendet werden können aufgelistet. Ein Converter ist ein Bearbeitungsschritt, der auf die Tabelle angewendet wird.</span>
  )

  const ExplainerCardList = (
    <span> 
      Hier werden alle ausgewählten Converter angezeigt. Der neuste Converter wird immer ganz oben angezeigt und 
      alle vorherigen Converter werden darunter angezeigt. Die Reihenfolg der Converter ist wichtig, da sie logisch voneinander abhängig sind. Deswegen
      müssen alle Converter gespeichert werden, damit der aktuellste Converter angewendet werden kann.
      </span>
  )

  const toolTipConverterListToCardList = function (){
    setShowConverterListTip(false);
    setShowCardListTip(true);
  }

  const toolTipCardListToConverterCard = function () {
    setShowCardListTip(false);
    tutorialRef.current?.showModal();
  }

  const handleConverterClick = (label, params, converterType, description) => {
    const newCard = {id: cardIdCounter, label: label, parameters: params, converterType: converterType, selectedFile: selectedFile, isEditing: true, description: description}; //Neue Card mit ID, label, Parametern, und converterType
    setCards([newCard, ...cards]); //Neue Card wird an den Anfang der Liste gesetzt
    setCardIdCounter(cardIdCounter + 1);
  }

  const handleDeleteCard = (idToDelete) => {
    setCards(prevCards => prevCards.filter(card => card.id !== idToDelete)
      .map((card) => {
        if (card.id === idToDelete) {
          return { ...card, isEditing: false };
        } else if (card.id > idToDelete) {
          return { ...card, isEditing: true, preview: null };
        }
        return card;
      }));
  };

  const converters = [
    {label: 'Gruppenüberschriften entfernen ', category: 'rmv', params: [ {name: 'Zeilennummer', type: 'array', required: true, apiName: 'rowIndex'}, {name: 'Spaltennummer', type: 'array', required: true, apiName: 'columnIndex'}, {name:'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name: 'Startspalte', type: 'number', required: false, apiName: 'startColumn'}], converterType: 'REMOVE_GROUPED_HEADER', 
      description:'Mithilfe dieses Converters können Verschachtelungen in der Kopfzeile und in den Spalten aufgelöst werden. Dabei müssen die Zeilen und Spalten angegeben werden, in der die Verschachtelungen auftreten. Dies ist notwendig, da in der Datenbank keine Verschachtelungen auftreten dürfen und eine flache Struktur erforderlich ist. Ein ausführliches Beispiel ist im Wiki zu finden.' }, //RemoveGroupedHeader
    {label: 'Leere Zeilen ausfüllen ', category: 'add', params: [{name: 'Zeilennummer', type:'array', required: true, apiName: 'rowIndex'}], converterType: 'FILL_EMPTY_ROW', 
      description:'Nutzen Sie die Funktion "Leere Zeilen ausfüllen", wenn Sie leere Zellen in der von Ihnen angegebenen Zeile durch Werte, die links von den leeren Zellen stehen, ersetzen wollen.' }, //FillEmptyRows
    {label: 'Leere Spalten ausfüllen ', category: 'add', params: [{name: 'Spaltennummer', type:'array', required: true, apiName: 'columnIndex'}], converterType: 'FILL_EMPTY_COLUMN',
      description: 'Diese Funktion füllt leere Zellen in der von Ihnen angegebenen Spalte durch Werte, die oberhalb der leeren Zellen stehen.' }, //FillEmptyColumns
    {label: 'Spalten entfernen (nach Index) ', catergory:'rmv', params: [{name: 'Spaltennummern', type: 'array', required: true, apiName: 'columnIndex'}], converterType: 'REMOVE_COLUMN_BY_INDEX',
      description:'Diese Funktion kann eine oder mehrere Spalten entfernen, indem der Index angegeben wird. Wenn mehrere Spalten gelöscht werden sollen, müssen die Zahlen mit einem Komma und ohne Leerzeichen voneinander getrennt werden.'},//RemoveColumnByIndex
    {label: 'Zeilen entfernen (nach Index) ', category: 'rmv', params: [{name: 'Zeilennummern', type: 'array', required: true, apiName: 'rowIndex'}], converterType: 'REMOVE_ROW_BY_INDEX', 
      description: 'Diese Funktion kann eine oder mehrere Zeilen entfernen, indem der Index angegeben wird. Wenn mehrere Spalten gelöscht werden sollen, müssen die Zahlen mit einem Komma und ohne Leerzeichen voneinander getrennt werden.'},//RemoveColumnByIndex
    {label: 'Spaltenüberschriften hinzufügen ', category: 'add', params: [{name: 'Überschriftenliste (Kommagetrennt)', type: 'array', required: true, apiName: 'headerNames'}], converterType: 'ADD_HEADER_NAME',
      description: 'Mithilfe dieses Converters können die Spaltennamen verändert werden. Die Namen werden durch ein Komma getrennt und der erste Name wird auf die erste Spalte angewendet, der zweite Name auf die zweite Spalte und so weiter.'}, //AddHeaderNames
    {label: 'Fußzeile entfernen ', category:'rmv', params: [{name:'Threshold', type: 'number', required: false, apiName: 'threshold'}, {name:'Blocklist', type: 'array', required: false, apiName: 'blockList'}], converterType: 'REMOVE_FOOTER', 
      description:'Mit diesem Converter wird der Abschnitt unter den eigentlichen Daten entfernt. Dies dient dazu, die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können.'}, //RemoveFooter
    {label: 'Kopfzeile entfernen ',category:'rmv', params: [{name: 'Threshold', type: 'number', required: false, apiName: 'threshold'}, {name: 'Blocklist', type: 'array', required: false, apiName: 'blockList'}], converterType: 'REMOVE_HEADER',
      description: 'Mit diesem Converter wird der Abschnitt über den eigentlichen Daten entfernt. Dies dient dazu die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können. '}, //RemoveHeader
    {label: 'Einträge ersetzen ', category: 'mdfy', params: [ {name: 'Suchbegriff', type: 'string', required: true, apiName: 'search'}, {name: 'Ersetzen durch: ', type: 'string', required: true, apiName: 'replacement'},{name: 'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name: 'Suche in Spalten', type: 'array', required: true, apiName: 'columnIndex'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'}, {name: 'Endspalte', type: 'number', required: false, apiName: 'endColumn'} ], converterType: 'REPLACE_ENTRIES',
      description: 'Dieser Converter kann einzelne Einträge in der Tabelle ersetzen, um beispielsweise fehlerhafte Einträge zu korrigieren. Dabei wird die gesamte Tabelle nach dem Suchbegriff durchsucht und anschließend durch den "Ersetzen durch" - Wert ersetzt.'}, //ReplaceEntries
    {label: 'Zeile aufteilen ', category: 'mdfy', params: [{name:'Spaltenindex', type: 'number', required: true, apiName: 'columnIndex'}, {name: 'Trennzeichen', type: 'string', required: false, apiName: 'delimiter'}, {name:'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'}], converterType: 'SPLIT_ROW', 
      description: 'Bei Anwendung dieses Converters werden die Einträge der angegebenen Spalte in mehrere Zeilen aufgeteilt. Dies ist notwendig, wenn sich in einer Zelle mehrere Werte befinden. Die Werte werden im Standardfall nach einem Zeilenumbruch aufgeteilt.'}, //SplitRow
    {label: 'Ungültige Zeilen entfernen ', category: 'rmv', params: [{name:'Threshold', type: 'number', apiName: 'threshold'}, {name: 'Blocklist', type: 'array', apiName: 'blockList'}], converterType: 'REMOVE_INVALID_ROWS',
      description: 'Dieser Converter entfernt ungültige Zeilen. Im Standardfall wird eine Zeile als ungültig angesehen, sobald sich mindestens eine leere Zelle in dieser Zeile befindet. Der Threshold gibt an, wie viele Einträge in einer Zeile korrekt gefüllt sein müssen, damit sie nicht gelöscht werden. Komplett leere Zeilen werden immer gelöscht '}, //RemoveInvalidRows
    {label: 'Nachträgliche Spalten entfernen ', category:'rmv', params: [{name:'Threshold', type: 'number', apiName: 'threshold'}, {name:'Blocklist', type: 'array', apiName: 'blockList'}], converterType: 'REMOVE_TRAILING_COLUMN',
      description: 'Dieser Converter entfernt Spalten am Ende der Tabelle. Zum Beispiel wenn die letzten beiden Spalten der Tabelle leer sind, so werden diese entfernt.'}, //RemoveTrailingColumns
     {label: 'Spalten am Anfang entfernen ', category:'rmv', params: [{name:'Blocklist', type: 'array', apiName: 'blocklist'}], converterType: 'REMOVE_LEADING_COLUMN',
      description: 'Entfernt ungültige Spalten am Anfang der Tabelle. Standardmäßig werden Spalten mit leere Zellen als ungültig angesehen. Mit der Blocklist können weitere Werte als ungültig festgelegt werden.'}, //RemoveTrailingColumns
    // weitere Converter hier hinzufügen
  ];

  //Converter dropdown
  const [openCategory, setOpenCategory]=useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRmvOpen, setIsRmvOpen] = useState(false);
  const [isMdfyOpen, setIsMdfyOpen] = useState(false);
  const categorizedConverters={
    add: converters.filter((c) => c.category === 'add'),
    rmv: converters.filter((c)=> c.category === 'rmv'),
    mdfy: converters.filter((c) => c.category === 'mdfy')
  };


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
        description: converter.description
      };
    }).filter(Boolean); // Remove null values

    const allCards = [...newCards.reverse(), { id: 0, label: "Start", parameters: [{ name: "Start" }] }];
    setCards(allCards);
    setCardIdCounter(newCards.length + 1); // Update the card ID counter
  };

  function getValueFromFormData(param, formData) {
    const apiName = param.apiName;
    const field = formData?.[apiName];
    if (param.type === 'string') {
      if (param.required && (!field || field.toString().trim() === "")) {
        return "";
      } else if (!param.required && (!field || field.toString().trim() === "")) {
        return undefined;
      }
      return field;
    }
    if (param.type === 'number') {
      if (typeof field === 'number') {
        return field;
      }
      if (param.required && (!field || field.toString().trim() === "")) {
        return "invalid number";
      } else if (!param.required && (!field || field.toString().trim() === "")) {
        return undefined;
      }
      return field;
    }
    if (param.type === 'array') {
      if (Array.isArray(field)) {
        return field;
      }
      if (!field || field.toString().trim() === ""){
        console.log("return empty array");
        return [];
      } 
      return field.split(',').map(item => item.toString().trim());
    }
  }

  const formDataRefs = useRef({}); // speichert Zugriff auf formData je Karte
  const saveCardRefs = useRef({});

  const registerFormDataGetter = (cardId, getterFn) => {
    formDataRefs.current[cardId] = getterFn;
  };

  const registerSaveFn = (cardId, saveFn) => {
  saveCardRefs.current[cardId] = saveFn;
};

  const handleSaveFromCard = async (cardId, formData) => {
    console.log(`Data saved from card ${cardId}:`, formData);

    // Update the cards state with the formData for the saved card
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => { // hier wird dafür gesorft dass ich die Karte und Formdata bekomme und sie nicht mehr im Bearbeitungszustand ist
        if (card.id === cardId) {
          console.log("Was ist das denn?", card, "Und die FormData?", formData)

          return { ...card, formData, isEditing: false };
        } else if (card.id > cardId) { //hier wird dafür gesorgt dass die Karten NACH der gespeicherten zurückgesetzt werden
          return { ...card, isEditing: true, preview: null };
        }
        return card;
      });

      // Generate the JSON for the saved card and its predecessors
      const filteredCards = updatedCards.filter((card) => card.id <= cardId && card.id !== 0).reverse(); //nur aus der aktuellen und denen davor ohne 0 die json bauen!
      console.log("Die gefilterten Karten: ", filteredCards);

      const structures = filteredCards.map((card) => {
        const inputs = card.parameters.reduce((acc, param) => { //reduce macht daraus ein Objekt mit allen Parametern
          const apiName = param.apiName;
          acc[apiName] = getValueFromFormData(param, card.formData); //getValueFromFormData: aus der formData die Werte extrahieren
         
          return acc; //für jede Karte wird ein Objekt mit allen Infos erstellt
        }, {});
         

        return {
          converterType: card.converterType,
          ...inputs,
        };
      });
      console.log("Die Strukturen sind: ", structures); //

      const jsonData = {
        name: "Example Name",
        structures: structures,
        endRow: null,
        endColumn: null,
      };

      console.log("Generated JSON:", JSON.stringify(jsonData, null, 2));

      // Call getPreview and update the card with the preview data
      getPreview(jsonData).then((previewData) => {
        console.log("try to get preview with ", jsonData);
        if (previewData) {
          console.log("Preview Data:", previewData);

          setCards((latestCards) =>
            latestCards.map((card) =>
              card.id === cardId ? { ...card, preview: previewData } : card //die Preview wird nur bei der aktuellen Karte aktualisiert
            )
          );
        }
      });
      return updatedCards;
    });
  };

   const handleSaveAllCards = async () => {
  const sortedCards = [...cards.filter((c) => c.id !== 0)].sort((a, b) => a.id - b.id);

  for (const card of sortedCards) {
    const saveFn = saveCardRefs.current[card.id];
    if (!saveFn) continue;

    const success = await saveFn(); // wichtig: async/await damit Reihenfolge bleibt
    if (!success) break; // abbrechen bei Fehler
  }
};

const handleSaveUpToCard = async (upToCardId) => {
    const sortedCards = [...cards.filter((c) => c.id !== 0 && c.id <= upToCardId)].sort((a, b) => a.id - b.id);
    for (const card of sortedCards) {
      const saveFn = saveCardRefs.current[card.id];
      if (!saveFn) continue;

      const success = await saveFn();
      if(!success) break;
    }
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
    limit = limit / 32.4 - 2; // / row height - puffer
    return parseInt(limit);
  }


  {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async (jsonData) => {
    console.log("Attempting to get a preview from the server");
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const {api} = await getApiInstance();

    try {
      const data = await new Promise((resolve, reject) => {
        console.log("selectedFile: ", selectedFile);
        console.log("selectedFileType: ", selectedFile.type);
        //set amount of rows based on window height
        let limit = computeTablelimit();
        if (limit < 5) { limit = 5 }
        let opts = { "limit": limit };
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
    } catch (error) {
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
        acc[param.apiName] = getValueFromFormData(param, card.formData);
        return acc;
      }, {});
      return {
        converterType: card.converterType,
        ...inputs,
      };
    });

    const jsonData = {
      name: schemaToEdit.name,
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
        editedSchema: jsonData,
        showSuccessMessage: true
      }
    }
    );

  }

  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div className="pb-20 "> {/* pb-20 damit der Footer nicht überlappt. */}

      {/* Tutorial */}
        <dialog ref={tutorialRef} className="place-self-center shadow-xl backdrop:bg-black/50 p-5">
          <p className="text-lg font-semibold">Tutorial</p>
          <img src="/TutorialConverterCard.png" alt="tutorial"/>
          <button
            type="button"
            className="mt-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => tutorialRef.current?.close()}
          >
            Ok
          </button>
        </dialog>
      
      {/* Seitenüberschrift */}
      <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-3 text-left p-4">{selectedFile?.name}</h1>
          <button
            type="button"
            className="p-5"
            onClick={() => {
              setShowConverterListTip(true);
              setShowCardListTip(false);
              tutorialRef.current?.close();
            }}
          >
            <QuestionMarkCircleIcon className="h-7 w-7 text-gray-600 hover:text-indigo-500"/>
          </button>
      </div>
     

      <div className="flex gap-8">

        {/* Linke Spalte: Converter-Buttons */}
          <div className="flex-1 w-1/5 space-y-2 pl-4 relative">

            {/* Hinzufügen-Dropdown */}
        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-600 hover:bg-indigo-500 text-white rounded-lg shadow transition-colors"
        >
          <span>Converter zum Hinzufügen</span>
          {isAddOpen ? "▲" : "▼" }
        </button>
        {isAddOpen && (
          <div className="space-y-1 ml-2 mt-1 transition-all duration-300 ease-in-out">
            {categorizedConverters.add.map((conv) => (
              <button
                key={conv.label}
                onClick={() =>
                  handleConverterClick(conv.label, conv.params, conv.converterType, conv.description)
                }
                className="w-full text-left px-3 py-1 bg-gray-700 hover:bg-indigo-500 text-white rounded transition-colors"
              >
                {conv.label}
              </button>
            ))}
          </div>
        )}

        {/* Entfernen-Dropdown */}
        <button
          onClick={() => setIsRmvOpen(!isRmvOpen)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow transition-colors"
        >
          <span>Converter zum Entfernen</span>
          {isRmvOpen ? "▲" : "▼"}
        </button>
        {isRmvOpen && (
          <div className="space-y-1 ml-2 mt-1 transition-all duration-300 ease-in-out">
            {categorizedConverters.rmv.map((conv) => (
              <button
                key={conv.label}
                onClick={() =>
                  handleConverterClick(conv.label, conv.params, conv.converterType, conv.description)
                }
                className="w-full text-left px-3 py-1 bg-gray-700 hover:bg-indigo-500 text-white rounded transition-colors"
              >
                {conv.label}
              </button>
            ))}
          </div>
        )}
        {/* Bearbeiten */}
        <button
          onClick={() => setIsMdfyOpen(!isMdfyOpen)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow transition-colors"
          >
            <span>Converter zum Bearbeiten</span>
            {isMdfyOpen ? "▲" : "▼"}
          </button>
          {isMdfyOpen && (
            <div className="space-y-1 ml-2 mt-1 transition-all duration-300 ease-in-out">
              {categorizedConverters.mdfy.map((conv) => (
                <button
                  key={conv.label}
                  onClick={() =>
                    handleConverterClick(conv.label, conv.params, conv.converterType, conv.description)
                  }
                  className="w-full text-left px-3 py-1 bg-gray-700 hover:bg-indigo-500 text-white rounded transition-colors"
                >
                  {conv.label}
                </button>
              ))}
              </div>
          )}

          
            <div className=" absolute top-0 translate-x-full z-50">
            <Tooltip tooltipContent={ExplainerConverterList} showTutorial={showConverterListTip} direction={"left"} onClick={toolTipConverterListToCardList}/>
          </div>
        </div>
        

        {/* Rechte Spalte: Cards */}
        <div className="w-3/4 space-y-4 px-20 relative">
        
          <div className="flex justify-end">
              <button
                className="mt-4 text-sm bg-gray-600 hover:bg-indigo-500 text-white rounded px-6 py-2"
                onClick={handleSaveAllCards}
              >
                Alles speichern
              </button>
            </div>

          {cards.map((card) => (
            //console.log("Card:", card),
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
              onDelete={handleDeleteCard}
              description={card.description}
              onRegisterFormDataGetter={registerFormDataGetter}
              onRegisterSaveFn={registerSaveFn}
              onSaveCascade={handleSaveUpToCard}
              
            />
          ))}

          <div className="absolute top-0 -translate-y-full z-50"
            onMouseEnter={() => setIsPopupHovered(true)}
            onMouseLeave={() => setIsPopupHovered(false)}
          >
            <Tooltip tooltipContent={ExplainerCardList} showTutorial={showCardListTip} direction={"bottom"} onClick={toolTipCardListToConverterCard}/>
          </div>

        </div>

        <button
          className="fixed bottom-10 right-4 bg-gray-600 hover:bg-indigo-500 text-white px-2 py-2 mb-2 rounded shadow "
          onClick={handleEditComplete}
        >Anwenden</button>

      </div>
    </div>
  );
}
