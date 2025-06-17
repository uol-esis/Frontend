import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import TableFromJSON from "./../TableFromJSON";
import { useConverterContext } from "./ConverterContex";



export default function ConverterCard({id, label, parameters, converterType, formData: initialFormData, preview, onSave, onEditToggle, isEditing, cards, onDelete}) {
    const [formData, setFormData] = useState(initialFormData || {});
    const [errors, setErrors] = useState({}); //Fehlerstate
    const [expanded, setExpanded] = useState(id===0); //hier ist der State, welcher später Dropdown öffnet, noch nicht implementiert
    const [validationError, setValidationError] = useState(""); // State for validation error message


    const [showOptional, setShowOptional]= useState(false); //State für die optionalen Parameter

    const requiredParameters=parameters.filter(param => param.required);
    const optionalParameters = parameters.filter(param => !param.required);


    //for context
    const {register, isSaved} = useConverterContext();

    //register to context
    useEffect(() => {
        register({
            id,
            saveFn: handleSave }); //hier ist der Zusammenhang zwischen der erwarteten Funktion und der handleSave
        },[register, id, handleSave]);
    

    const saved = isSaved(id); //Check if the card is saved


    // formData updaten, wenn initialFormData sich ändert
    useEffect(() => {
      setFormData(initialFormData || {});
    }, [initialFormData]);

    const handleInputChange = (param, value, type) => { //bisher sind die Parameter noch nicht kontrolliert im Hinblick auf required

        let error = "";

        setFormData((prevData) => ({
            ...prevData,
            [param]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [param]: error,
        }));
    };
    
    const handleSave = async () => {
        // Validierung aktueller Karte        
        // Clear validation error if all previous cards are saved
        setValidationError("");

        let newErrors = {};

        parameters.forEach(param => {
            const value = formData[param.apiName];
            if (param.required && (!value || value.toString().trim() === '')) {
            newErrors[param.apiName] = 'Dieses Feld ist erforderlich.';
            } 
        });

        setErrors(newErrors);
        //console.log("Errors:", Object.keys(newErrors).length);
        if (Object.keys(newErrors).length === 0) {
            //console.log("Gespeicherte Daten:", JSON.stringify(formData, null, 2));
        

        //Aktuelle Karte speichern
            //call function in edit.jsx
            if (onSave) {
              await onSave(id, formData); // Pass the card ID and form data to the parent function
            }
        //und auch die vorherigen

        for(const card of cards) {
            if(card.id > id) break;
            if(!card.isSaved) {
                await card.saveFn(); 
            }
        }
        }
    }

    const handleExpandButton = () => {
        setExpanded(!expanded); //Toggle den expanded State
        if (expanded) {

        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            {/* Hauptcontainer: linke Parameter 2/3, rechte Buttons 1/3 */}
            {id === 0 ? (
              <>
               <h2 className="text-xl font-semibold text-gray-700 text-center">Start</h2>
                <div className="flex justify-end">

                    {/* Buttons-Bereich rechts für Start-Card */}

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs text-gray-600 hover:text-indigo-500"
                        >
                            {expanded ? "Ergebnis einklappen ▲" : "Ergebnis ausklappen ▼"}
                        </button>
                    </div>
                </>
            ) : (
              <>
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">{label}</h2>
                <div className="flex flex-col md:flex-row gap-4">

                    {/* Linke Seite: Parameterbereich */}
                    <div className="flex-1">
                      {/* Userbenachrichtigung wenn es keine required Parameter  */}
                        {requiredParameters.length === 0 && (
                          <p className="text-sm italic text-gray-500 mb-4 pl-20">
                            Dieser Converter funktioniert automatisch – Sie müssen keine Pflichtfelder ausfüllen, haben aber die Möglichkeit optionale Parameter anzugeben.
                          </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {requiredParameters.map(param => (
                                <div key={param.apiName} className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">
                                        {param.name}{param.required && <span className="text-red-500"> *</span>}
                                    </label>
                                    <input
                                        type={param.type === "number" ? "number" : "text"}
                                        required={param.required}
                                        value={formData[param.apiName] || ""}
                                        onChange={e => handleInputChange(param.apiName, e.target.value)}
                                        readOnly={!isEditing}
                                        className={`shadow rounded px-2 py-1 text-sm ${!isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}`}
                                    />
                                    {errors[param.apiName] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[param.apiName]}</p>
                                    )}
                                </div>
                            ))}
                            {showOptional && optionalParameters.map(param => (
                                <div key={param.apiName} className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">{param.name}</label>
                                    <input
                                        type={param.type === "number" ? "number" : "text"}
                                        value={formData[param.apiName] || ""}
                                        onChange={e => handleInputChange(param.apiName, e.target.value)}
                                        readOnly={!isEditing}
                                        className={`shadow rounded px-2 py-1 text-sm ${!isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}`}
                                    />
                                    {errors[param.apiName] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[param.apiName]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {validationError && (
                        <p className="text-red-500 text-xs mt-2">{validationError}</p>
                    )}

                    {/* Rechte Seite: Buttons */}
                    <div className="w-full md:w-1/3 flex flex-col justify-between items-end space-y-2 mt-4 md:mt-0">
                        <button
                            type="button"
                            className="text-xl transform transition-transform duration-200 hover:scale-110 hover:-translate-y-0.5"
                            onClick={() => onDelete?.(id)}
                        >
                            🗑️
                        </button>

                        {optionalParameters.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setShowOptional(v => !v)}
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                {showOptional ? "Optionale Parameter verbergen ▲" : "Optionale Parameter anzeigen ▼"}
                            </button>
                        )}

                        <div className="flex gap-2 flex-wrap justify-end">
                            {isEditing ? (
                                <button
                                    className="text-xs bg-gray-600 hover:bg-indigo-500 text-white rounded px-4 py-2"
                                    onClick={handleSave}
                                >
                                    Speichern
                                </button>
                            ) : (
                                <button
                                    className="text-xs bg-gray-600 hover:bg-indigo-500 text-white rounded px-4 py-2"
                                    onClick={() => onEditToggle(id, true)}
                                >
                                    Bearbeiten
                                </button>
                            )}
                            <button
                                disabled={isEditing && id !== 0}
                                onClick={() => handleExpandButton()}
                                className={`text-xs ${isEditing && id !== 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-indigo-500"}`}
                            >
                                {expanded ? "Ergebnis einklappen ▲" : "Ergebnis ausklappen ▼"}
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}

        {/*Dropdown erscheint unter dem Card Wrapper */}
        <AnimatePresence initial={false}>
        {expanded && (
            <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-4 object-cover bg-white p-4"
            >
              {/* Table with preview or error message */}
                      <div className="flex-1 overflow-auto">
                        {
                          preview.length ? (
                            <TableFromJSON
                              data= {preview}
                            />
                          ) : null
                        }
                      </div>
            {/* hier statt des images echte Tabelle */}
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  
);

}
