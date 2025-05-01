// src/components/QueryPreview.tsx
import React from "react";
import { useAtom } from "jotai";
import {selectedTableAtom, queryChainAtom, selectedColumnAtom} from "./queryAtoms";
import { buildStructuredQuery } from "./generateSqlFromQuery"; // <--- neue JSON-Funktion
import { Card, CardContent, Typography, Button } from "@mui/material";

export const QueryPreview = () => {
    const [table] = useAtom(selectedTableAtom);
    const [chain] = useAtom(queryChainAtom);
    const [selectedColumn] = useAtom(selectedColumnAtom);

    if (!table) return null;

    const structuredQuery = buildStructuredQuery(table, chain, selectedColumn);
    const json = JSON.stringify(structuredQuery, null, 2);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(json);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1">Query JSON Vorschau</Typography>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{json}</pre>
                <Button onClick={handleCopyToClipboard} variant="contained" sx={{ mt: 2 }}>
                    JSON kopieren
                </Button>
            </CardContent>
        </Card>
    );
};
