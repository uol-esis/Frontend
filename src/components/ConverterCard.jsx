import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import TableFromJSON from "./../TableFromJSON";



export default function ConverterCard({id, label, parameters, converterType, formData: initialFormData, preview, onSave, onEditToggle, isEditing, cards}) {
    const [formData, setFormData] = useState(initialFormData || {});
    const [errors, setErrors] = useState({}); //Fehlerstate
    const [expanded, setExpanded] = useState(id===0); //hier ist der State, welcher später Dropdown öffnet, noch nicht implementiert
    const [validationError, setValidationError] = useState(""); // State for validation error message


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
    
    const handleSave = () => {
        // Check if any previous cards are still in editing mode
        const unsavedCards = cards.filter((card) => card.id < id && card.id !== 0 && card.isEditing);
        if (unsavedCards.length > 0) {
          setValidationError("Bitte speichern Sie zuerst alle vorherigen Karten."); // Set error message
          return; // Prevent saving
        }
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
        
            //call function in edit.jsx
            if (onSave) {
              onSave(id, formData); // Pass the card ID and form data to the parent function
            }
        }
    }

    const handleExpandButton = () => {
        setExpanded(!expanded); //Toggle den expanded State
        if (expanded) {
          
        }
    };

    return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 "> {/* Übergeordneter Container der so tut als wären die beiden Cards eine Card */}
        {/* Parameter Bereich mit Buttons */}
        <div className="relative bg-white">
            {/*  <p>{id}</p> */} {/* ID funktioniert, kann du dir hier anzeigen lassen, später Zeile entfernen */}
             
            {id === 0 ? ( //Startkomponente hat ja keine Parameter, nur Überschrift (und später dann Dropdown)
                <h2 className="text-xl font-semibold text-gray-700">Start</h2>
            ) : (
            <>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {parameters.map((param) => (
                <div key={param.apiName} className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                    {param.name}
                    {param.required && <span className="text-red-500"> *</span>}
                </label>
                <input
                    type={param.type === "number" ? "number" : "text"}
                    required={!!param.required}
                    value={formData[param.apiName] || ""}
                    onChange={(e) =>
                    handleInputChange(param.apiName, e.target.value, param.type)
                    }
                    readOnly={!isEditing} //man kann nur bearbeiten wenn Editing State true
                    className={` shadow rounded px-2 py-1 text-sm 
                    ${
                        !isEditing
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-white"
                    }`}
                />
                {errors[param.apiName] && (
                    <p className="text-red-500 text-xs mt-1">
                    {errors[param.apiName]}
                    </p>
                )}
                </div>
            ))}
            </div>
            </>
        )}
        {validationError && (
          <p className="text-red-500 text-xs mt-2">{validationError}</p>
        )}

        {/* Löschen Button */}
        {id !== 0 ? (
         <button type ="button"
            //onClick={} hier muss noch die Funktion rein, die die Card löscht --> APIIIIIIIIIIIIIIIIIIIIIPIPIPIPIPIPI
            className="absolute p-1 rounded hover:bg-gray-200 top-2 right-2">
                🗑️
        </button>
        ) : null }
    

        {/* Buttons: absolut am unteren Rand der ersten Karte*/}
        <div className="absolute bottom-2 right-2 flex gap-4">
            {id !== 0 &&
            (isEditing ? (
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
            ))}
            <button
            disabled={isEditing && id !== 0} 
            onClick={() => handleExpandButton()}
            className={`text-xs ${
                isEditing && id !== 0 ? "text-gray-300 cursor-not-allowed text-xs"
            : "text-gray-600 hover:text-indigo-500 text-xs"
                
            }`}
            
            
            >
             
            {expanded ? "Ergebnis einklappen ▲" : "Ergebnis ausklappen ▼"}
            </button>
        </div>
        </div>

        {/*Dropdown erscheint unter dem Card Wrapper */}
        <AnimatePresence initial={false}>
        {expanded && (
            <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className=" object-cover bg-white p-4"
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



