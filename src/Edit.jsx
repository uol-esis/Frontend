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

  const [collapseAllSignal, setCollapseAllSignal] = useState(0);

  const [showConverterListTip, setShowConverterListTip] = useState(false);
  const [showCardListTip, setShowCardListTip] = useState(false);
  const tutorialRef = useRef();
  const errorDialogRef = useRef();

  const [cardAdded, setCardAdded] = useState(false); //für das Unterbinden des initalen Scrollings

  const ExplainerConverterList = (
    <span>Here are all the converters that can be applied to the table. A converter is an editing step that is applied to the table.</span>
  )

  const ExplainerCardList = (
    <span> 
      All selected converters are displayed here. The newest converter is always shown at the top, and all previous converters are displayed below. The order of the converters is important because they are logically dependent on each other. Therefore, all converters must be saved for the most recent converter to be applied.
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
    setCardAdded(true); // Karte wurde hinzugefügt
  }

  //Userfeedback Funktion da kein Scrolling mehr:
  useEffect(() => {
    if (cardAdded) {
      const timer = setTimeout(() => {
        setCardAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cardAdded])



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
    {label: 'Remove grouped headers', category: 'rmv', params: [ {name: 'Row number', type: 'array', required: true, apiName: 'rowIndex'}, {name: 'Column number', type: 'array', required: true, apiName: 'columnIndex'}, {name:'Start row', type: 'number', required: false, apiName: 'startRow'}, {name: 'Start column', type: 'number', required: false, apiName: 'startColumn'}], converterType: 'REMOVE_GROUPED_HEADER', 
      description:'This converter resolves nested headers in the table and columns. The rows and columns containing the nested headers must be specified. This is necessary because the database requires a flat structure. A detailed example can be found in the Wiki.' },
    {label: 'Fill empty rows', category: 'add', params: [{name: 'Row number', type:'array', required: true, apiName: 'rowIndex'}], converterType: 'FILL_EMPTY_ROW', 
      description:'Use the "Fill empty rows" function to replace empty cells in the specified row with values from the cells to the left of the empty ones.' },
    {label: 'Fill empty columns', params: [{name: 'Column number', type:'array', required: true, apiName: 'columnIndex'}], converterType: 'FILL_EMPTY_COLUMN',
      description: 'This function fills empty cells in the specified column with values from the cells above the empty ones.' },
    {label: 'Remove columns (by index)', category:'rmv', params: [{name: 'Column numbers', type: 'array', required: true, apiName: 'columnIndex'}], converterType: 'REMOVE_COLUMN_BY_INDEX',
      description:'This function can remove one or more columns by specifying their index. Multiple columns should be separated by commas without spaces.'},
    {label: 'Remove rows (by index)', category: 'rmv', params: [{name: 'Row numbers', type: 'array', required: true, apiName: 'rowIndex'}], converterType: 'REMOVE_ROW_BY_INDEX', 
      description: 'This function can remove one or more rows by specifying their index. Multiple rows should be separated by commas without spaces.'},
    {label: 'Add column headers', category: 'add', params: [{name: 'Header list (comma-separated)', type: 'array', required: true, apiName: 'headerNames'}], converterType: 'ADD_HEADER_NAME',
      description: 'This converter can modify column names. Names are separated by commas: the first name applies to the first column, the second to the second, and so on.'},
    {label: 'Remove footer', category:'rmv', params: [{name:'Threshold', type: 'number', required: false, apiName: 'threshold'}, {name:'Blocklist', type: 'array', required: false, apiName: 'blockList'}], converterType: 'REMOVE_FOOTER', 
      description:'Removes the section below the actual data. This separates the table from metadata and ensures correct display.'},
    {label: 'Remove header',category:'rmv', params: [{name: 'Threshold', type: 'number', required: false, apiName: 'threshold'}, {name: 'Blocklist', type: 'array', required: false, apiName: 'blockList'}], converterType: 'REMOVE_HEADER',
      description: 'Removes the section above the actual data. This separates the table from metadata and ensures correct display.'},
    {label: 'Replace entries', params: [ {name: 'Search term', type: 'string', required: true, apiName: 'search'}, {name: 'Replace with', type: 'string', required: true, apiName: 'replacement'},{name: 'Start row', type: 'number', required: false, apiName: 'startRow'}, {name: 'Search in columns', type: 'array', required: true, apiName: 'columnIndex'}, {name:'End row', type: 'number', required: false, apiName: 'endRow'}, {name: 'End column', type: 'number', required: false, apiName: 'endColumn'} ], converterType: 'REPLACE_ENTRIES',
      description: 'This converter can replace individual entries in the table, for example to correct errors. The table is searched for the search term and replaced with the "Replace with" value.'},
    {label: 'Split cells', category: 'mdfy', params: [{name:"Split into rows or columns" ,type:"enum", required:true, options:["Row", "Column"], values:["row", "column"], index:0, apiName: "mode"}, {name:'Column index', type: 'number', required: true, apiName: 'columnIndex'}, {name: 'Delimiter', type: 'string', required: false, apiName: 'delimiter'}, {name:'Start row', type: 'number', required: false, apiName: 'startRow'}, {name:'End row', type: 'number', required: false, apiName: 'endRow'}], converterType: 'SPLIT_CELL', 
      description: 'This converter splits entries in the specified column into multiple rows or columns. This is necessary if a cell contains multiple values. By default, values are split at line breaks. A different delimiter can be specified in the "Delimiter" field. Leave empty for a space.'},
    {label: 'Remove invalid rows', params: [{name:'Threshold', type: 'number', apiName: 'threshold'}, {name: 'Blocklist', type: 'array', apiName: 'blockList'}], converterType: 'REMOVE_INVALID_ROWS',
      description: 'Removes invalid rows. By default, a row is considered invalid if it contains at least one empty cell. Threshold determines how many entries must be filled for the row to be kept. Completely empty rows are always removed.'},
    {label: 'Remove trailing columns', params: [{name:'Threshold', type: 'number', apiName: 'threshold'}, {name:'Blocklist', type:'array', apiName: 'blockList'}], converterType: 'REMOVE_TRAILING_COLUMN',
      description: 'Removes columns at the end of the table. For example, if the last two columns are empty, they are removed.'},
    {label: 'Remove leading columns', category:'rmv', params: [{name:'Blocklist', type:'array', apiName: 'blocklist'}], converterType: 'REMOVE_LEADING_COLUMN',
      description: 'Removes invalid columns at the beginning of the table. By default, columns with empty cells are considered invalid. Additional values can be added via the blocklist.'},
    {label: 'Remove row or column by keyword', category:'rmv', params: [{name:'Keywords', type: 'array', required:true, apiName: 'keywords'}, {name:'Remove rows', type: 'boolean',required:true, apiName: 'removeRows', index:0}, {name:'Remove columns', type: 'boolean', required:true, apiName: 'removeColumns', index:1},{name:'Ignore case', type: 'boolean', required:true, apiName: 'ignoreCase', index:2}, {name:'Match type', type: 'enum', required: true, options:["Contains keyword", "Exact match"], values:["CONTAINS", "EQUALS"], apiName: 'matchType', index: 0} ], converterType: 'REMOVE_KEYWORD',
      description: 'Removes rows and/or columns containing a specific keyword. The search can be refined by case sensitivity or by requiring an exact match.'},
    // add more...
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
      if(errorId == "none"){
        return;
      }
      errorDialogRef.current?.showModal();
    }, [errorId]);

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
      return field.split(',').map(item => item.toString().trim());
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
  }

  const formDataRefs = useRef({}); // speichert Zugriff auf formData je Karte
  const saveCardRefs = useRef({});

 const parseError = (error) => {
    let currentErrorId = errorId;
    try{
      const errorObj = JSON.parse(error.message);
      setErrorId(errorObj.status);
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

  const handleSaveFromCard = async (cardId, formData) => {

    // Update the cards state with the formData for the saved card
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => { // hier wird dafür gesorft dass ich die Karte und Formdata bekomme und sie nicht mehr im Bearbeitungszustand ist
        if (card.id === cardId) {

          return { ...card, formData, isEditing: false };
        } else if (card.id > cardId) { //hier wird dafür gesorgt dass die Karten NACH der gespeicherten zurückgesetzt werden
          return { ...card, isEditing: true, preview: null };
        }
        return card;
      });

      // Generate the JSON for the saved card and its predecessors
      const filteredCards = updatedCards.filter((card) => card.id <= cardId && card.id !== 0).reverse(); //nur aus der aktuellen und denen davor ohne 0 die json bauen!

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

      const jsonData = {
        name: "Example Name",
        structures: structures,
        endRow: null,
        endColumn: null,
      };


      // Call getPreview and update the card with the preview data
      getPreview(jsonData).then((previewData) => {
        if (previewData) {

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


  const computeTablelimit = () => {
    let limit = windowSize.height;
    limit = limit * 0.75 - 36; // 75% of screen - header row
    limit = limit / 32.4 - 2; // / row height - puffer
    return parseInt(limit);
  }


  {/* If a file and schema are selected, sends them to the server to get a preview*/ }
  const getPreview = async (jsonData) => {
    if (!selectedFile) {
      console.error("No file selected");
      setErrorId("103");
      return;
    }

    const {api} = await getApiInstance();

    try {
      const data = await new Promise((resolve, reject) => {
        //set amount of rows based on window height
        let limit = computeTablelimit();
        if (limit < 5) { limit = 5 }
        let opts = { "limit": limit };
        api.previewConvertTable(selectedFile, jsonData, opts, (error, data, response) => {
          if (error) {
            console.error(error);
            parseError(error);
            reject(error);
          } else {
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


  const handleEditComplete = () => {
    // Check if any card is still in editing mode
    const unsavedCards = cards.filter((card) => card.isEditing);
    if (unsavedCards.length > 0) {
      alert("Please save all cards first.");
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

  const prevCardCountRef = useRef(cards.length);


  return (
    !isLoggedIn ? <div>Not logged in</div>:
    <div className="pb-20 "> {/* pb-20 damit der Footer nicht überlappt. */}

    <ErrorDialog
      text={"Error!"}
      errorId={errorId}
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
        <div className="w-1/5 space-y-2 pl-4 sticky top-20 self-start h-fit">

            {/* Hinzufügen-Dropdown */}
        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-600 hover:bg-indigo-500 text-white rounded-lg shadow transition-colors"
        >
          <span>Converters for adding</span>
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
          <span>Converters for removing</span>
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
            <span>Converters for editing</span>
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

          
            <div className=" absolute top-0 translate-x-full z-100">
            <Tooltip tooltipContent={ExplainerConverterList} showTutorial={showConverterListTip} direction={"left"} onClick={toolTipConverterListToCardList}/>
          </div>
        </div>
        

        {/* Rechte Spalte: Cards */}
        <div className="w-3/4 space-y-4 px-20 relative">
        {cardAdded && (
        <div className="mt-4 mx-auto bg-green-100 border border-green-500 text-green-800 px-6 py-3 rounded shadow">
          Converter successfully added below! 
        </div>
      )}
        
          <div className="flex justify-end">
              <button
                className="mt-4 text-sm bg-gray-600 hover:bg-indigo-500 text-white rounded px-6 py-2"
                onClick={handleSaveAllCards}
              >
                Save all
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
        >Apply</button>

      </div>
    </div>
  );
}
