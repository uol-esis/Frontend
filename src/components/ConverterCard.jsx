import React, {useState} from "react";

export default function ConverterCard({id, parameters}) {
    const [openStates, setOpenStates] = useState({}); //hier ist der State, welcher später Dropdown öffnet, noch nicht implementiert
    
    const [formData, setFormData] = useState({});
    
    const [errors, setErrors] = useState({}); //Fehlerstate

    const [isEditing, setIsEditing] = useState(true); //State dient dafür dass man wenn man auf Speichern klickt, die Felder nicht mehr editierbar sind (hier müsste User ja auf Bearbeiten, Löschen oder so klicken, damit du die Chain korrekt speichern kannst)

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
        setIsEditing(false); //Editing State wird auf false gesetzt


        // API MAGIC!!! (darauf achten dass es nicht absenden darf, wenn Errors da sind)
        console.log("Gespeicherte Daten:", JSON.stringify(formData, null, 2));
    }

    return(
        <div className="p-4 bg-white rounded-lg shadow  space-y-2 relative">
          {/*  <p>{id}</p> */} {/* ID funktioniert, kann du dir hier anzeigen lassen, später Zeile entfernen */}
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
                        type={param.type === 'number' ? 'number' : 'text'}
                        required={!!param.required}
                        value={formData[param.name] || ''}
                        onChange={e => handleInputChange(param.name, e.target.value, param.type)}
                        readOnly={!isEditing} //man kann nur bearbeiten wenn Editing State true
                        className={`border border-gray-300 shadow rounded px-2 py-1 text-sm 
                            ${!isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
                    />
                    {errors[param.name]&& (
                            <p className="text-red-500 text-xs mt-1">{errors[param.name]}</p>
                        )}
                    </div>
                ))}
                </div>
            )}
                {isEditing ? ( //wenn editing false, dann kein Speichern
                id !==0 ? ( 
                    <button
                        className="absolute bottom-2 right-2 text-xs bg-gray-600 hover:bg-indigo-500 text-white rounded px-4 py-2"
                        onClick={handleSave}
                    >
                        Speichern
                    </button> 
                ) : null //Startkomponente keinen Speichern Button
                    ) : (
                    <button
                        className="absolute bottom-2 right-2 text-xs bg-gray-600 hover:bg-indigo-500 text-white rounded px-4 py-2"
                        onClick={() => setIsEditing(true)}
                    >
                        Bearbeiten
                    </button> 
                    )};
                    
               
        </div>
    );
}