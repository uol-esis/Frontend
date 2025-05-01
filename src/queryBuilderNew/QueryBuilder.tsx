import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    Stack, TextField,
} from "@mui/material";
import {
    selectedTableAtom,
    queryChainAtom,
    dbSchemaAtom,
    selectedColumnAtom,
    queryResultsAtom
} from "./queryAtoms";
import {QueryNodeComponent} from "./QueryNodeComponent";
import {QueryPreview} from "./QueryPreview";
import {buildStructuredQuery, StructuredQuery} from "./generateSqlFromQuery";

const operators = ["=", "!=", ">", "<", ">=", "<="];
const aggregations = ["COUNT", "MIN", "MAX", "AVG"];
const directions = ["ASC", "DESC"];

export const QueryBuilder3 = () => {
    const [selectedTable, setSelectedTable] = useAtom(selectedTableAtom);
    const [chain, setChain] = useAtom(queryChainAtom);
    const [dbSchema, setDbSchema] = useAtom(dbSchemaAtom);
    const [selectedColumn, setSelectedColumn] = useAtom(selectedColumnAtom);
    const [queryChain] = useAtom(queryChainAtom);
    const [setQueryResults] = useAtom(queryResultsAtom);


    // Tabellen & Spalten dynamisch aus Atom
    const sampleTables = dbSchema ? Object.keys(dbSchema) : [];
    const columns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];

    useEffect(() => {
        const fetchDatabaseSchema = async () => {
            // Simuliere eine Antwort vom Backend
            const simulatedResponse = {
                users: ["id", "name", "email", "created_at"],
                orders: ["id", "user_id", "total", "status"],
                products: ["id", "name", "price", "stock"],
            };
            setDbSchema(simulatedResponse);
        };

        fetchDatabaseSchema();
    }, [setDbSchema]);

    // Funktion zum Simulieren eines Backend Calls basierend auf der Query
    const simulateBackendQuery = (query: StructuredQuery) => {
        const mockDb: Record<string, any[]> = {
            users: [
                { id: 1, name: "Max", email: "max@example.com", created_at: "2022-01-01" },
                { id: 2, name: "Anna", email: "anna@example.com", created_at: "2022-02-01" },
                { id: 3, name: "Tom", email: "tom@example.com", created_at: "2023-03-15" },
                { id: 4, name: "Lisa", email: "lisa@example.com", created_at: "2021-12-11" },
                { id: 5, name: "John", email: "john@example.com", created_at: "2023-07-22" },
            ],
            orders: [
                { id: 1, user_id: 1, total: 100, status: "completed" },
                { id: 2, user_id: 2, total: 150, status: "pending" },
                { id: 3, user_id: 3, total: 200, status: "completed" },
                { id: 4, user_id: 4, total: 50, status: "cancelled" },
                { id: 5, user_id: 5, total: 300, status: "completed" },
                { id: 6, user_id: 1, total: 80, status: "pending" },
                { id: 7, user_id: 2, total: 120, status: "completed" },
            ],
            products: [
                { id: 1, name: "Laptop", price: 1200, stock: 10 },
                { id: 2, name: "Phone", price: 800, stock: 25 },
                { id: 3, name: "Tablet", price: 600, stock: 15 },
                { id: 4, name: "Monitor", price: 300, stock: 8 },
                { id: 5, name: "Keyboard", price: 100, stock: 50 },
                { id: 6, name: "Mouse", price: 50, stock: 100 },
                { id: 7, name: "Headphones", price: 150, stock: 30 },
            ],
        };


        let result = [...(mockDb[query.table] || [])];

        // Apply filters
        if (query.filters) {
            query.filters.forEach(({ column, operator, value }) => {
                result = result.filter((row) => {
                    const cell = row[column];
                    switch (operator) {
                        case "=": return cell == value;
                        case "!=": return cell != value;
                        case ">": return cell > value;
                        case "<": return cell < value;
                        case ">=": return cell >= value;
                        case "<=": return cell <= value;
                        default: return true;
                    }
                });
            });
        }
        // Apply aggregations
        if (query.aggregations && query.aggregations.length > 0) {
            return query.aggregations.map(({ column, agg, having }) => {
                const values = result.map(r => Number(r[column])).filter(v => !isNaN(v));

                const aggregatedValue = (() => {
                    switch (agg) {
                        case "COUNT": return values.length;
                        case "SUM": return values.reduce((a, b) => a + b, 0);
                        case "AVG": return values.reduce((a, b) => a + b, 0) / values.length || 0;
                        case "MIN": return Math.min(...values);
                        case "MAX": return Math.max(...values);
                        default: return null;
                    }
                })();

                // HAVING clause simulation
                if (having) {
                    const pass = (() => {
                        switch (having.operator) {
                            case "=": return aggregatedValue == Number(having.value);
                            case "!=": return aggregatedValue != Number(having.value);
                            case ">": return aggregatedValue > Number(having.value);
                            case "<": return aggregatedValue < Number(having.value);
                            case ">=": return aggregatedValue >= Number(having.value);
                            case "<=": return aggregatedValue <= Number(having.value);
                            default: return true;
                        }
                    })();

                    if (!pass) return {};
                }

                return {
                    [`${agg}(${column})`]: aggregatedValue
                };
            });
        }

        // Apply orderBy
        if (query.orderBy) {
            query.orderBy.forEach(({ column, direction }) => {
                result.sort((a, b) => {
                    if (a[column] < b[column]) return direction === "ASC" ? -1 : 1;
                    if (a[column] > b[column]) return direction === "ASC" ? 1 : -1;
                    return 0;
                });
            });
        }

        // Apply select
        if (query.select && !query.select.includes("*")) {
            result = result.map(row => {
                const selected: Record<string, any> = {};
                query.select.forEach(col => selected[col] = row[col]);
                return selected;
            });
        }

        return result;
    };

    // Wenn der Benutzer die Abfrage erstellt hat, simulieren wir die Backend-Antwort
    const handleRunQuery = () => {
        if (!selectedTable) return;

        const structuredQuery = buildStructuredQuery(selectedTable, queryChain, selectedColumn);
        const responseData = simulateBackendQuery(structuredQuery);

        // Speichern der simulierten Antwort im queryResultsAtom
        setQueryResults(responseData);
    };

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
                <Stack direction="row" spacing={2} alignItems="center">

                    <TextField
                        label="Tabelle"
                        select
                        fullWidth
                        value={selectedTable ?? ""}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        sx={{flex: 2}}
                    >
                        {sampleTables.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Select
                        label="Spalten"
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

            <Stack direction="row" spacing={1.5} mb={2} >
                <Button variant="outlined" size="large" sx={{flex: 1}} onClick={addFilter}>
                    Filter
                </Button>
                <Button variant="outlined" size="large" sx={{flex: 1}} onClick={addSort}>
                    Sort
                </Button>
                <Button variant="outlined" size="large" sx={{flex: 1}} onClick={addAggregation}>
                    Aggregation
                </Button>
                <Button variant="outlined" size="large" sx={{flex: 1}} onClick={addJoin}>
                    Join
                </Button>
                <Button variant="contained" size="large" sx={{flex: 2}} onClick={handleRunQuery}>
                    Ausführen
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