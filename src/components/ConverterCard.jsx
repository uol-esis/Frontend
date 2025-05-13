import React from "react";

export default function ConverterCard({parameters}) {
    return(
        <div className="p-4 bg-white rounded:lg shadow flex flex-col">
            {parameters.map((param) => (
                <div key={param} className="text-center font-semibold">
                    <strong>{param}</strong>
                </div>
            ))}
        </div>
    );
}