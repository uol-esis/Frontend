import React, {useState} from "react";

export default function ConverterCard({id, parameters}) {
    const [openStates, setOpenStates] = useState({}); //hier ist der State, welcher 
    return(
        <div className="p-4 bg-white rounded:lg shadow flex flex-col">
          {/*  <p>{id}</p> */} {/* ID funktioniert, kann man sich hier anzeigen lassen, später Zeile entfernen */}
            {parameters.map((param) => (
                <div key={param} className="text-center font-semibold">
                    <strong>{param}</strong>
                    
                </div>
            ))}
        </div>
    );
}