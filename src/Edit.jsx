import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConverterCard from "./components/ConverterCard";
import { useAuthGuard } from "./hooks/AuthGuard";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "./ToolTip";
import keycloak from "./keycloak";
import { ApiClient, DefaultApi } from "th1";
import { getApiInstance } from "./hooks/ApiInstance";
import ErrorDialog from "./Popups/ErrorDialog";

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
  const [errorId, setErrorId] = useState("none");
  const [errorMsg, setErrorMsg] = useState("");

  const [collapseAllSignal, setCollapseAllSignal] = useState(0);

  const [showConverterListTip, setShowConverterListTip] = useState(false);
  const [showCardListTip, setShowCardListTip] = useState(false);
  const tutorialRef = useRef();
  const errorDialogRef = useRef();

  const [cardAdded, setCardAdded] = useState(false); //für das Unterbinden des initalen Scrollings

  const formDataRefs = useRef({}); // speichert Zugriff auf formData je Karte
  const saveCardRefs = useRef({});

  const bottomRef = useRef(null);
  const prevCardCountRef = useRef(cards.length);

  //Converter dropdown
  const [openCategory, setOpenCategory]=useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRmvOpen, setIsRmvOpen] = useState(false);
  const [isMdfyOpen, setIsMdfyOpen] = useState(false);

  /* -------------  Tutorials ------------- */

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

  const GroupHeaderExplainer = (
    <span> 
      Mithilfe dieses Converters können Verschachtelungen in der Kopfzeile und in den Spalten aufgelöst werden. 
      Dabei müssen die Zeilen und Spalten angegeben werden, in der die Verschachtelungen auftreten. 
      Außerdem muss in Startzeile und Startspalte angegeben werden, wo die tatsächlichen Daten beginnen. 
      Ein ausführliches Beispiel ist im Wiki zu finden (
      <span 
        onClick={() => { window.open("/wiki?targetId=groupHeader&offset=-600", "_blank");}} 
        className="text-blue-400 underline cursor-pointer"
      >
      siehe hier
      </span>).
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


  /* ------------- Convertercards -------------  */
    const converters = [
    {label: 'Gruppenüberschriften entfernen (Drei Schritte) ', category: 'rmv', params: [ {name: 'Zeilennummer', type: 'array', required: true, apiName: 'rowIndex'}, {name: 'Spaltennummer', type: 'array', required: true, apiName: 'columnIndex'}, {name:'Startzeile der Daten', type: 'number', required: true, apiName: 'startRow'}, {name: 'Startspalte der Daten', type: 'number', required: true, apiName: 'startColumn'}], converterType: 'REMOVE_GROUPED_HEADER', 
      description: GroupHeaderExplainer}, //RemoveGroupedHeader
    {label: 'Leere Zeilen ausfüllen ', category: 'add', params: [{name: 'Zeilennummer', type:'array', required: true, apiName: 'rowIndex'}], converterType: 'FILL_EMPTY_ROW', 
      description:'Nutzen Sie die Funktion "Leere Zeilen ausfüllen", wenn Sie leere Zellen in der von Ihnen angegebenen Zeile durch Werte, die links von den leeren Zellen stehen, ersetzen wollen.' }, //FillEmptyRows
    {label: 'Leere Spalten ausfüllen ', category: 'add', params: [{name: 'Spaltennummer', type:'array', required: true, apiName: 'columnIndex'}], converterType: 'FILL_EMPTY_COLUMN',
      description: 'Diese Funktion füllt leere Zellen in der von Ihnen angegebenen Spalte durch Werte, die oberhalb der leeren Zellen stehen.' }, //FillEmptyColumns
    {label: 'Spalten entfernen (nach Index) ', category:'rmv', params: [{name: 'Spaltennummern', type: 'array', required: true, apiName: 'columnIndex'}], converterType: 'REMOVE_COLUMN_BY_INDEX',
      description:'Diese Funktion kann eine oder mehrere Spalten entfernen, indem der Index angegeben wird. Wenn mehrere Spalten gelöscht werden sollen, müssen die Zahlen mit einem Komma oder Bindestrich getrennt werden (z.B. 1-4).'},//RemoveColumnByIndex
    {label: 'Zeilen entfernen (nach Index) ', category: 'rmv', params: [{name: 'Zeilennummern', type: 'array', required: true, apiName: 'rowIndex'}], converterType: 'REMOVE_ROW_BY_INDEX', 
      description: 'Diese Funktion kann eine oder mehrere Zeilen entfernen, indem der Index angegeben wird. Wenn mehrere Zeilen gelöscht werden sollen, müssen die Zahlen mit einem Komma oder Bindestrich getrennt werden (z.B. 1-4).'},//RemoveColumnByIndex
    {label: 'Spaltenüberschriften hinzufügen ', category: 'add', params: [{name: 'Überschriftenliste (Kommagetrennt)', type: 'array', required: true, apiName: 'headerNames'}, {name:'Hinzufügen oder ersetzen', type:"enum", required:true, options:["Oberhalb hinzufügen", "Bestehenden Header ersetzen"], values:['INSERT_AT_TOP', 'REPLACE_FIRST_ROW'], apiName:'headerPlacementType'}], converterType: 'ADD_HEADER_NAME',
      description: 'Mithilfe dieses Converters können die Spaltennamen verändert werden. Die Namen werden durch ein Komma getrennt und der erste Name wird auf die erste Spalte angewendet, der zweite Name auf die zweite Spalte und so weiter.'}, //AddHeaderNames
    {label: 'Fußzeile entfernen ', category:'rmv', params: [{name:'Threshold', type: 'number', required: false, apiName: 'threshold'}, {name:'Blocklist', type: 'array', required: false, apiName: 'blockList'}], converterType: 'REMOVE_FOOTER', 
      description:'Mit diesem Converter wird der Abschnitt unter den eigentlichen Daten entfernt. Dies dient dazu, die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können.'}, //RemoveFooter
    {label: 'Kopfzeile entfernen ',category:'rmv', params: [{name: 'Threshold', type: 'number', required: false, apiName: 'threshold'}, {name: 'Blocklist', type: 'array', required: false, apiName: 'blockList'}], converterType: 'REMOVE_HEADER',
      description: 'Mit diesem Converter wird der Abschnitt über den eigentlichen Daten entfernt. Dies dient dazu die Tabelle vom Text mit Metainformationen zu trennen und korrekt anzeigen zu können. '}, //RemoveHeader
    {label: 'Einträge ersetzen ', category: 'mdfy', params: [ {name: 'Suchbegriff', type: 'string', required: true, apiName: 'search'}, {name: 'Suchstruktur (Regex)', type:'String', required: false, apiName:'regexSearch' }, {name: 'Ersetzen durch: ', type: 'string', required: true, apiName: 'replacement'},{name: 'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name: 'Suche in Spalten', type: 'array', required: true, apiName: 'columnIndex'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'} ], converterType: 'REPLACE_ENTRIES',
      description: 'Dieser Converter kann einzelne Einträge in der Tabelle ersetzen, um beispielsweise fehlerhafte Einträge zu korrigieren. Dabei wird die gesamte Tabelle nach dem Suchbegriff durchsucht und anschließend durch den "Ersetzen durch" - Wert ersetzt. Lässt man den Suchebgriff leer, werden Leerzeichen bzw. leere Einträge ersetzt. '}, //ReplaceEntries
    {label: 'Zellen aufteilen ', category: 'mdfy', params: [{name:"Aufteilen in Spalten oder Zeilen" ,type:"enum", required:true, options:["Zeile", "Spalte"], values:["row", "column"], index:0, apiName: "mode"}, {name:'Spaltenindex', type: 'number', required: true, apiName: 'columnIndex'}, {name: 'Trennzeichen', type: 'string', required: false, apiName: 'delimiter'}, {name:'Startzeile', type: 'number', required: false, apiName: 'startRow'}, {name:'Endzeile', type: 'number', required: false, apiName: 'endRow'}], converterType: 'SPLIT_CELL', 
      description: 'Bei Anwendung dieses Converters werden die Einträge der angegebenen Spalte in mehrere Zeilen oder Spalten aufgeteilt. Dies ist notwendig, wenn sich in einer Zelle mehrere Werte befinden. Die Werte werden im Standardfall nach einem Zeilenumbruch aufgeteilt. Im Feld Delimiter kann ein anderes Trennzeichen eingegeben werden. Für ein Leerzeichen muss nichts beim Delimiter eingegeben werden.'}, //SplitRow
    {label: 'Ungültige Zeilen entfernen ', category: 'rmv', params: [{name:'Threshold', type: 'number', apiName: 'threshold'}, {name: 'Blocklist', type: 'array', apiName: 'blockList'}], converterType: 'REMOVE_INVALID_ROWS',
      description: 'Dieser Converter entfernt ungültige Zeilen. Im Standardfall wird eine Zeile als ungültig angesehen, sobald sich mindestens eine leere Zelle in dieser Zeile befindet. Der Threshold gibt an, wie viele Einträge in einer Zeile korrekt gefüllt sein müssen, damit sie nicht gelöscht werden. Komplett leere Zeilen werden immer gelöscht '}, //RemoveInvalidRows
    {label: 'Nachträgliche Spalten entfernen ', category:'rmv', params: [{name:'Threshold', type: 'number', apiName: 'threshold'}, {name:'Blocklist', type: 'array', apiName: 'blockList'}], converterType: 'REMOVE_TRAILING_COLUMN',
      description: 'Dieser Converter entfernt Spalten am Ende der Tabelle. Zum Beispiel wenn die letzten beiden Spalten der Tabelle leer sind, so werden diese entfernt.'}, //RemoveTrailingColumns
     {label: 'Spalten am Anfang entfernen ', category:'rmv', params: [{name:'Blocklist', type: 'array', apiName: 'blocklist'}], converterType: 'REMOVE_LEADING_COLUMN',
      description: 'Entfernt ungültige Spalten am Anfang der Tabelle. Standardmäßig werden Spalten mit leere Zellen als ungültig angesehen. Mit der Blocklist können weitere Werte als ungültig festgelegt werden.'}, //RemoveTrailingColumns
      {label: 'Zeile oder Spalte nach Stichwort löschen ', category:'rmv', params: [{name:'Stichwörter', type: 'array', required:true, apiName: 'keywords'}, {name:'Zeilen entfernen', type: 'boolean',required:true, apiName: 'removeRows', index:0}, {name:'Spalte nach Überschrift entfernen', type: 'boolean', required:true, apiName: 'removeColumns', index:1},{name:'Groß- und Kleinschreibung ignorieren', type: 'boolean', required:true, apiName: 'ignoreCase', index:2}, {name:'Genauigkeit', type: 'enum', required: true, options:["Beinhaltet Stichwort", "Exakt gleich"], values:["CONTAINS", "EQUALS"], apiName: 'matchType', index: 0} ], converterType: 'REMOVE_KEYWORD',
      description: 'Dieser Converter entfernt Zeilen und oder Spalten in denen ein bestimmtes Stichwort vorkommt. Bei den Spalten gilt es zu beachten, dass das Stichwort in der Spaltenüberschrift vorkommen muss. Die Suche kann verfeinert werden, indem auf Groß- und Kleinschreibung geachtet wird oder ob nur ein Teil des Wortes vorkommen muss damit es gelöscht wird. '}, //RemoveTrailingColumns
    {label:'Pivot Matrix', category:'mdfy', params:[{name:'Pivot Feld', type:'map', required: true, apiName:'pivotField', keyName:'Überschrift', valueName:'Spaltenindex', map:true  }, {name:'Block Indizes', type:'array', apiName:'blockIndices'}, {name:'Lücken füllen in Spalten (Name)', type:'array', apiName:'keysToCarryForward'}], converterType:'PIVOT_MATRIX',
      description:"Dieser Converter entfernt bestimmte Spalten aus einer Tabelle mit zusammengefassten Daten anhand ihrer Spaltennummern. Mit dem Feld Block-Indizes lässt sich die Tabelle in mehrere logische Abschnitte aufteilen – hilfreich, wenn in derselben Tabelle mehrere solcher Strukturen nacheinander stehen. Mit dem Feld Spaltenüberschriften verwenden zum füllen von Lücken kann man Spalten festlegen, deren Werte automatisch aus der vorherigen Zeile übernommen werden, falls in einer Zeile nichts eingetragen ist"},
      {label:'Achsen tauschen', category:'mdfy',params:[], converterType:'TRANSPOSE_MATRIX',
        description:"Bei diesem Converter werden die Zeilen und Spalten vertauscht."
      }
      // add more...
  ];

  const categorizedConverters={
    add: converters.filter((c) => c.category === 'add'),
    rmv: converters.filter((c)=> c.category === 'rmv'),
    mdfy: converters.filter((c) => c.category === 'mdfy')
  };

  const getConverterByType = (type) => {
      const match = converters.find(converter => {
        return converter.converterType === type;
      });
      return match || null;
    };

  const handleConverterClick = (label, params, converterType, description) => {
    let newCards = [];
    let cardId = cardIdCounter
    let newCard;

    if(converterType === 'REMOVE_GROUPED_HEADER'){
      const fillRowConverter = getConverterByType("FILL_EMPTY_ROW");
      newCard = {id: cardId++, label: fillRowConverter.label, parameters: fillRowConverter.params, converterType: fillRowConverter.converterType, selectedFile: selectedFile, isEditing: true, description: fillRowConverter.description};
      newCards.push(newCard);

      //REMOVE_GROUPED_HEADER
      newCard = {id: cardId++, label: label, parameters: params, converterType: converterType, selectedFile: selectedFile, isEditing: true, description: description}; //Neue Card mit ID, label, Parametern, und converterType
      newCards.push(newCard);

      const addHeaderNameConverter = getConverterByType("ADD_HEADER_NAME");
      newCard = {id: cardId++, label: addHeaderNameConverter.label, parameters: addHeaderNameConverter.params, converterType: addHeaderNameConverter.converterType, selectedFile: selectedFile, isEditing: true, description: addHeaderNameConverter.description};
      newCards.push(newCard); 
    }else{
      newCard = {id: cardId++, label: label, parameters: params, converterType: converterType, selectedFile: selectedFile, isEditing: true, description: description}; //Neue Card mit ID, label, Parametern, und converterType
      newCards.push(newCard);
    }

    setCards(prevCards => [...newCards.reverse(), ...prevCards]);
    setCardIdCounter(cardId);
    setCardAdded(true); // Karte wurde hinzugefügt
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

  //get a value from a parameter from a convertercard
  function getValueFromFormData(param, formData) {
    const apiName = param.apiName;
    const field = formData?.[apiName];
    if (param.type === 'string') {
      if(param.apiName === 'delimiter' && !field){
        return "\n";
      }
      if (!field || field.toString().trim() === "") {
        return "";
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
        return [];
      } 
      let numbers = isMultipleNumbers(field);
      return numbers.split(',').map(item => item.toString().trim());
    }
    if(param.type === 'boolean'){
      if(!field){
        return false;
      }else{
        return field;
      }
    }
    if(param.type === 'enum'){
      if(!field){
        return "";
      }else{
        return field;
      }
    }
    if(param.type === 'map'){
      if(!field){
        return "";
      }else{
        return field;
      }
    }
  }

   {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async (jsonData) => {
    console.log("Attempting to get a preview from the server");
    if (!selectedFile) {
      console.error("No file selected");
      setErrorId("103");
      return;
    }

    const {api} = await getApiInstance();

    try {
      const data = await new Promise((resolve, reject) => {
        console.log("selectedFile: ", selectedFile);
        console.log("selectedFileType: ", selectedFile.type);

          const reader = new FileReader();

          reader.onload = function (e) {
              const text = e.target.result;
              const rows = text
                  .split("\n")            // Datei in Zeilen splitten
                  .slice(0, 5)            // nur die ersten 5 Zeilen nehmen
                  .map(row => row.split(",")); // jede Zeile in Zellen splitten

              console.log("selectedFile in frontend " + rows);
          };

          reader.readAsText(selectedFile);


        //set amount of rows based on window height
        let limit = computeTablelimit();
        if (limit < 5) { limit = 5 }
        let opts = { "limit": limit };
        console.log("json " + JSON.stringify(jsonData));
        api.previewConvertTable(selectedFile, jsonData, opts, (error, data, response) => {
          if (error) {
            console.error(error);
            parseError(error);
            reject(error);
          } else {
            console.log('API called to get preview successfully to get preview. Returned data: ' + data);
            console.log('API response: ' + JSON.stringify(response));
            resolve(data);
          }
        });
      });
      return data;
    } catch (error) {
      console.error("Error during previewConvertTable:", error);
      setErrorId("105");
      return null;
    }
  };

  /* -------------- handle save state in convertercards ----------------- */

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
    setCollapseAllSignal(s => s+1)
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

/* --------------------- Helper functions  -------------------- */

  useEffect(() => {
      if(errorId == "none"){
        return;
      }
      errorDialogRef.current?.showModal();
    }, [errorId]);

//translate 1-4 notation into 1,2,3,4
 const isMultipleNumbers = (inputString) => {
  return inputString.replace(/\s*(\d+)\s*-\s*(\d+)\s*/g, (_, start, end) => {
    start = parseInt(start);
    end = parseInt(end);

    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers.join(',');
  });
}

 const parseError = (error) => {
    let currentErrorId = errorId;
    try{
      const errorObj = JSON.parse(error.message);
      if(errorObj.status){
        setErrorId(errorObj.status);
        setErrorMsg(errorObj.detail);
      }else{
        setErrorId("0");
      }
    }catch{
      setErrorId("0");
    }
    if(currentErrorId == errorId){
      errorDialogRef.current?.showModal();
    }
  }

const registerFormDataGetter = (cardId, getterFn) => {
  formDataRefs.current[cardId] = getterFn;
};

const registerSaveFn = (cardId, saveFn) => {
  saveCardRefs.current[cardId] = saveFn;
};

  const computeTablelimit = () => {
    let limit = windowSize.height;
    limit = limit * 0.75 - 36; // 75% of screen - header row
    limit = limit / 32.4 - 2; // / row height - puffer
    return parseInt(limit);
  }

useEffect(() => {
  if (cardAdded) {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setCardAdded(false); // zurücksetzen
  }
  // prevCardCountRef.current = cards.length; // nicht mehr nötig
}, [cards.length, cardAdded]);

//save leave edit page and show preview 
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

    if(!schemaToEdit){
      console.error("schemaToEdit is null");
      setErrorId("106");
      return;
    }

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

  /* ----------------- Actual page -------------------- */ 
  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div className="pb-20 "> {/* pb-20 damit der Footer nicht überlappt. */}

    <ErrorDialog
      text={"Fehler!"}
      errorId={errorId}
      message={errorMsg}
      onConfirm={() => { errorDialogRef.current?.close();}}
      dialogRef={errorDialogRef}
    />

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
     
     

      <div className="flex gap-8 px-4">

        {/* Linke Spalte: Converter-Buttons */}
        <div className="w-1/5 space-y-2 pl-4 sticky top-20 self-start h-fit relative">

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

        </div>

        <div className=" absolute fixed top-1/4 left-1/5 w-1/2 z-50">
            <Tooltip tooltipContent={ExplainerConverterList} showTutorial={showConverterListTip} direction={"left"} onClick={toolTipConverterListToCardList}/>
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

          {cards.slice().reverse().map((card) => (
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
              collapseAllSignal={collapseAllSignal}
              
            />
          ))}
          <div ref={bottomRef} />

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
