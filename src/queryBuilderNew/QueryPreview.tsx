// src/components/QueryPreview.tsx
import React from "react";
import { useAtom } from "jotai";
import { selectedTableAtom, queryChainAtom } from "./queryAtoms";
import { generateSql } from "./generateSqlFromQuery";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const QueryPreview = () => {
    const [table] = useAtom(selectedTableAtom);
    const [chain] = useAtom(queryChainAtom);

    if (!table) return null;

    const sql = generateSql(table, chain);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(sql);
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="subtitle1">SQL Vorschau</Typography>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{sql}</pre>
                <Button onClick={handleCopyToClipboard} variant="contained" sx={{ mt: 2 }}>
                    SQL Kopieren
                </Button>
            </CardContent>
        </Card>
    );
};
