// src/components/QueryPreview.tsx
import React from "react";
import { useAtom } from "jotai";
import {selectedTableAtom, queryChainAtom, selectedColumnAtom, queryResultsAtom} from "./queryAtoms";
import { buildStructuredQuery } from "./generateSqlFromQuery";
import {TableDisplay} from "./Table";

export const QueryPreview = () => {
    const [table] = useAtom(selectedTableAtom);
    const [chain] = useAtom(queryChainAtom);
    const [selectedColumn] = useAtom(selectedColumnAtom);
    const [queryResults] = useAtom(queryResultsAtom);

    if (!table) return null;

    const structuredQuery = buildStructuredQuery(table, chain, selectedColumn);
    const json = JSON.stringify(structuredQuery, null, 2);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(json);
    };

    return (
        <div>
            <h2>Antwort vom Backend</h2>
            <TableDisplay data={queryResults} />
        </div>
    );
};
