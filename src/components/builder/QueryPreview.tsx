import React from "react";
import {useAtom} from "jotai";
import {selectedTableAtom, queryResultsAtom} from "../../atoms/queryAtoms";
import {TableDisplay} from "../shared/Table";

export const QueryPreview = () => {
    const [table] = useAtom(selectedTableAtom);
    const [queryResults] = useAtom(queryResultsAtom); // Hier wird der Zustand abgerufen

    if (!table) return null;

    console.log(queryResults);

    return (
        <div>
            <h2>Antwort vom Backend</h2>
            <TableDisplay data={queryResults}/> {/* Anzeige der Ergebnisse */}
        </div>
    );
}
