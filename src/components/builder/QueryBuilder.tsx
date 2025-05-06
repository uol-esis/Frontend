// components/builder/QueryBuilder.tsx
import React, { useEffect } from "react";
import {Box, Button, Typography} from "@mui/material";
import {useAtom, useSetAtom} from "jotai";
import {
    selectedTableAtom,
    queryChainAtom,
    dbSchemaAtom,
    selectedColumnAtom,
    queryResultsAtom, selectableColumnsAtom, QueryNode,
} from "../../atoms/queryAtoms";

import { TableSelect } from "../shared/TableSelect";
import { ColumnMultiSelect } from "../shared/ColumnMultiSelect";
import { QueryControls } from "./QueryControls";
import { QueryNodeComponent } from "./nodes/QueryNode";
import { QueryPreview } from "./QueryPreview";
import {buildStructuredQuery, StructuredQuery} from "../../utils/buildStructureQuery";
import {
    addAggregationNode,
    addFilterNode,
    addJoinNode,
    addSortNode,
    fetchSimulatedSchema, runQuery
} from "../../utils/queryBuilderHelpers";
import {buildQueryChainFromStructuredQuery} from "../../utils/buildQueryChainFromStructuredQuery";

export const QueryBuilder = () => {
    const [selectedTable, setSelectedTable] = useAtom(selectedTableAtom);
    const [chain, setChain] = useAtom(queryChainAtom);
    const [dbSchema, setDbSchema] = useAtom(dbSchemaAtom);
    const [selectedColumns, setSelectedColumns] = useAtom(selectedColumnAtom);
    const [selectableColumns, setSelectableColumns] = useAtom(selectableColumnsAtom);
    const setQueryResults = useSetAtom(queryResultsAtom);

    const sampleTables = dbSchema ? Object.keys(dbSchema) : [];
    const columns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];

    useEffect(() => {
        const loadSchema = async () => {
            const schema = await fetchSimulatedSchema();
            setDbSchema(schema);
        };
        loadSchema();
    }, [setDbSchema]);

    useEffect(() => {
        if (!dbSchema || !selectedTable) return;

        // Start mit den Spalten der Haupttabelle
        let updatedColumns = [...(dbSchema[selectedTable] || [])];

        // Füge Spalten aller Join-Tabellen hinzu
        chain.forEach((node) => {
            if (node.type === "join" && node.table && dbSchema[node.table]) {
                updatedColumns.push(...dbSchema[node.table]);
            }
        });

        // Optional: Duplikate entfernen
        const uniqueColumns = Array.from(new Set(updatedColumns));

        setSelectableColumns(uniqueColumns);
    }, [dbSchema, selectedTable, chain, setSelectableColumns]);

    const addFilter = () => {
        const node = addFilterNode(columns);
        if (node) setChain((prev) => [...prev, node]);
    };

    const addAggregation = () => {
        const node = addAggregationNode(columns);
        if (node) setChain((prev) => [...prev, node]);
    };

    const addJoin = () => {
        const node = addJoinNode(columns, sampleTables);
        if (node) setChain((prev) => [...prev, node]);
    };

    const addSort = () => {
        const node = addSortNode(columns);
        if (node) setChain((prev) => [...prev, node]);
    };

    const addGroupBy = () => {
        const column = columns[0];
        const node: QueryNode = { type: "groupBy", column };
        setChain((prev) => [...prev, node]);
    };

    const handleRunQuery = () => {
        if (!selectedTable) return;
        runQuery(selectedTable, chain, selectedColumns, setQueryResults);
    };

    const handleLoadSampleStructure = () => {
        const sample: StructuredQuery = {
            table: "users",
            select: ["id", "name", "total", ],
            orderBy: [
                { column: "name", direction: "ASC" }
            ],
            joins: [
                { table: "orders", sourceColumn: "id", targetColumn: "user_id" }
            ],
            groupBy: ["name"],
            aggregations: [
                { column: "total", agg: "MAX" }
            ],
        };

        setSelectedTable(sample.table);
        setSelectedColumns(sample.select);
        const loadedChain = buildQueryChainFromStructuredQuery(sample);
        setChain(loadedChain);
    };

    return (
        <Box sx={{ maxWidth: 850, mx: "auto", p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Query Builder
            </Typography>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="outlined" onClick={handleLoadSampleStructure}>
                    Beispiel-Query laden
                </Button>
            </Box>

            <Box mb={2} display="flex" gap={2}>
                <Box flex={2}>
                    <TableSelect
                        tables={sampleTables}
                        value={selectedTable ?? ""}
                        onChange={setSelectedTable}
                    />
                </Box>
                <Box flex={1}>
                    <ColumnMultiSelect
                        columns={columns}
                        selected={selectedColumns}
                        onChange={setSelectedColumns}
                    />
                </Box>
            </Box>

            <QueryControls
                onAddFilter={addFilter}
                onAddAggregation={addAggregation}
                onAddGroupBy={addGroupBy}
                onAddJoin={addJoin}
                onAddSort={addSort}
                onRunQuery={handleRunQuery}
            />

            <Box>
                {chain.map((node, index) => (
                    <QueryNodeComponent key={index} node={node} index={index} />
                ))}
            </Box>

            <QueryPreview />
        </Box>
    );
};
