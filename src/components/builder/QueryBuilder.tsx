// components/builder/QueryBuilder.tsx
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {useAtom, useSetAtom} from "jotai";
import {
    selectedTableAtom,
    queryChainAtom,
    dbSchemaAtom,
    selectedColumnAtom,
    queryResultsAtom,
} from "../../atoms/queryAtoms";

import { TableSelect } from "../shared/TableSelect";
import { ColumnSelect } from "../shared/ColumnSelect";
import { QueryControls } from "./QueryControls";
import { QueryNodeComponent } from "./nodes/QueryNode";
import { QueryPreview } from "./QueryPreview";
import { buildStructuredQuery } from "../../utils/buildStructureQuery";
import {
    addAggregationNode,
    addFilterNode,
    addJoinNode,
    addSortNode,
    fetchSimulatedSchema, runQuery
} from "../../utils/queryBuilderHelpers";

export const QueryBuilder = () => {
    const [selectedTable, setSelectedTable] = useAtom(selectedTableAtom);
    const [chain, setChain] = useAtom(queryChainAtom);
    const [dbSchema, setDbSchema] = useAtom(dbSchemaAtom);
    const [selectedColumns, setSelectedColumns] = useAtom(selectedColumnAtom);
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

    const handleRunQuery = () => {
        if (!selectedTable) return;
        runQuery(selectedTable, chain, selectedColumns, setQueryResults);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Query Builder
            </Typography>

            <Box mb={2} display="flex" gap={2}>
                <Box flex={2}>
                    <TableSelect
                        tables={sampleTables}
                        value={selectedTable ?? ""}
                        onChange={setSelectedTable}
                    />
                </Box>
                <Box flex={1}>
                    <ColumnSelect
                        columns={columns}
                        selected={selectedColumns}
                        onChange={setSelectedColumns}
                    />
                </Box>
            </Box>

            <QueryControls
                onAddFilter={addFilter}
                onAddAggregation={addAggregation}
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
