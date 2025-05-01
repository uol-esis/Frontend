import React, {useState} from "react";
import {useAtom} from "jotai";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    Stack,
} from "@mui/material";
import {selectedTableAtom, queryChainAtom, QueryNode, dbSchemaAtom, selectedColumnAtom} from "./queryAtoms";
import {QueryNodeComponent} from "./QueryNodeComponent";
import {QueryPreview} from "./QueryPreview";

const operators = ["=", "!=", ">", "<", ">=", "<="];
const aggregations = ["COUNT", "MIN", "MAX", "AVG"];
const directions = ["ASC", "DESC"];

export const QueryBuilder3 = () => {
    const [selectedTable, setSelectedTable] = useAtom(selectedTableAtom);
    const [chain, setChain] = useAtom(queryChainAtom);
    const [dbSchema] = useAtom(dbSchemaAtom);
    const [selectedColumn, setSelectedColumn] = useAtom(selectedColumnAtom);

    // Tabellen & Spalten dynamisch aus Atom
    const sampleTables = dbSchema ? Object.keys(dbSchema) : [];
    const columns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];

    const addFilter = () => {
        if (!columns.length) return; // <-- geändert
        setChain((prev) => [
            ...prev,
            { type: "filter", column: columns[0], operator: operators[0], value: "" },
        ]);
    };

    const addAggregation = () => {
        if (!columns.length) return; // <-- geändert
        setChain((prev) => [
            ...prev,
            {
                type: "aggregation",
                column: columns[0],
                agg: aggregations[0],
                operator: operators[0],
                value: "",
            },
        ]);
    };

    const addJoin = () => {
        if (!columns.length) return; // <-- geändert
        setChain((prev) => [
            ...prev,
            {
                type: "join",
                table: sampleTables[0],
                sourceColumn: columns[0],
                targetColumn: columns[0],
            },
        ]);
    };

    const addSort = () => {
        if (!columns.length) return;
        setChain((prev) => [
            ...prev,
            {
                type: "orderBy",
                column: columns[0],
                direction: directions[0],
            },
        ]);
    };

    return (
        <Box sx={{maxWidth: 800, mx: "auto", p: 2}}>
            <Typography variant="h4" gutterBottom>
                Query Builder
            </Typography>

            <Box mb={2}>
                <Typography variant="subtitle1">Tabelle auswählen:</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Select
                        fullWidth
                        value={selectedTable ?? ""}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        displayEmpty
                        sx={{flex: 2}}
                    >
                        <MenuItem value="" disabled>
                            Tabelle wählen
                        </MenuItem>
                        {sampleTables.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        multiple
                        value={selectedColumn}
                        onChange={(e) => {
                            let value = typeof e.target.value === "string"
                                ? e.target.value.split(",")
                                : e.target.value;

                            // Wenn "*" ausgewählt wurde, ignoriere alle anderen
                            if (value.includes("*")) {
                                value = ["*"];
                            } else {
                                // Entferne "*" falls bereits gewählt und jetzt andere dazu kommen
                                value = value.filter(v => v !== "*");
                            }

                            setSelectedColumn(value);
                        }}
                        renderValue={(selected) => selected.join(", ")}
                        sx={{ flex: 1 }}
                    >
                        <MenuItem value="*">Alle</MenuItem>
                        {columns.map((col) => (
                            <MenuItem key={col} value={col}>
                                {col}
                            </MenuItem>
                        ))}
                    </Select>

                </Stack>
            </Box>

            <Stack direction="row" spacing={2} mb={2}>
                <Button variant="outlined" onClick={addFilter}>
                    + Filter
                </Button>
                <Button variant="outlined" onClick={addSort}>
                    + Sortierung
                </Button>
                <Button variant="outlined" onClick={addAggregation}>
                    + Aggregation
                </Button>
                <Button variant="outlined" onClick={addJoin}>
                    + Join
                </Button>
            </Stack>

            <div>
                {chain.map((node, i) => (
                    <QueryNodeComponent key={i} node={node} index={i}/>
                ))}
            </div>
            {/* SQL-Vorschau hinzufügen */}
            <QueryPreview/>
        </Box>
    );
};