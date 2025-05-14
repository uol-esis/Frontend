import React, {useState} from "react";

export default function ConverterCard({id, parameters}) {
    const [openStates, setOpenStates] = useState({}); //hier ist der State, welcher 
    
    const [formData, setFormData] = useState({});
    
    const handleInputChange = (param, value) => { //bisher sind die Parameter noch nicht kontrolliert im Hinblick auf required
        setFormData((prevData) => ({
            ...prevData,
            [param]: value,
        }));
    };

    const handleSave = () => {
        // API MAGIC
        console.log("Gespeicherte Daten:", formData);
    }

    return(
        <div className="p-4 bg-white rounded-lg shadow  space-y-2 relative">
          {/*  <p>{id}</p> */} {/* ID funktioniert, kann man sich hier anzeigen lassen, später Zeile entfernen */}
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
                        onChange={e => handleInputChange(param.name, e.target.value)}
                        className="border border-gray-300 shadow rounded px-2 py-1 text-sm"
                    />
                    </div>
                ))}
                </div>
            <button
                className="absolute bottom-2 right-2 text-xs bg-gray-600 hover:bg-indigo-500 text-white rounded px-4 py-2"
                onClick={handleSave}
                >Speichern</button>
        </div>
    );
}