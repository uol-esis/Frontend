import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion"; 

export default function ConverterCard({id, label, parameters, converterType, formData: initialFormData, onSave}) {
    const [formData, setFormData] = useState(initialFormData || {});
    const [errors, setErrors] = useState({}); //Fehlerstate
    const [isEditing, setIsEditing] = useState(true); //State dient dafür dass man wenn man auf Speichern klickt, die Felder nicht mehr editierbar sind (hier müsste User ja auf Bearbeiten, Löschen oder so klicken, damit du die Chain korrekt speichern kannst)
    const [expanded, setExpanded] = useState(id===0); //hier ist der State, welcher später Dropdown öffnet, noch nicht implementiert
    
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
        let newErrors = {};

        parameters.forEach(param => {
            const value = formData[param.name];
            if (param.required && (!value || value.toString().trim() === '')) {
            newErrors[param.name] = 'Dieses Feld ist erforderlich.';
            } 
        });

        setErrors(newErrors);
        console.log("Errors:", Object.keys(newErrors).length);
        if (Object.keys(newErrors).length === 0) {
            setIsEditing(false); //Editing State wird auf false gesetzt
            console.log("Gespeicherte Daten:", JSON.stringify(formData, null, 2));
        
            //call function in edit.jsx
            if (onSave) {
              onSave(id, formData); // Pass the card ID and form data to the parent function
            }
        }
    }

    return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 "> {/* Übergeordneter Container der so tut als wären die beiden Cards eine Card */}
        {/* Parameter Bereich mit Buttons */}
        <div className="relative bg-white">
            {/*  <p>{id}</p> */} {/* ID funktioniert, kann du dir hier anzeigen lassen, später Zeile entfernen */}
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{label}</h2>
            
            {id === 0 ? ( //Startkomponente hat ja keine Parameter, nur Überschrift (und später dann Dropdown)
                <h2 className="text-xl font-semibold text-gray-700">Start</h2>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {parameters.map((param) => (
                <div key={param.name} className="flex flex-col">
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
                {errors[param.name] && (
                    <p className="text-red-500 text-xs mt-1">
                    {errors[param.name]}
                    </p>
                )}
                </div>
            ))}
            </div>
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
                onClick={() => setIsEditing(true)}
                >
                Bearbeiten
                </button>
            ))}
            <button
            disabled={isEditing && id !== 0} 
            onClick={() => setExpanded(!expanded)}
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
            <img
                src="/tabelle.png"
                alt="TestDropdown"
                
            />
            {/* hier statt des images echte Tabelle */}
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  
);

}



