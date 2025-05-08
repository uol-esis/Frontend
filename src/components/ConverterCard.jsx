import React from "react";

export default function converterCard({parameters}) {
    return(
        <div>
            {parameters.map((param) => (
                <div key={param}>
                    <strong>{param}</strong>
                </div>
            ))}
        </div>
    )
}