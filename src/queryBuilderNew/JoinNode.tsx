import React from "react";
import {MenuItem, Select, Grid, Stack, Box} from "@mui/material";
import {dbSchemaAtom, QueryNode, selectedTableAtom} from "./queryAtoms";
import {useAtom} from "jotai";

const columns = ["id", "name", "age", "price", "created_at"];
const sampleTables = ["users", "orders", "products"];

type Props = {
    node: QueryNode & { type: "join" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

export const JoinNode: React.FC<Props> = ({node, updateNode}) => {
    const [selectedTable] = useAtom(selectedTableAtom);
    const [dbSchema] = useAtom(dbSchemaAtom);

    const sampleTables = dbSchema ? Object.keys(dbSchema) : [];
    const sourceColumns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];
    const targetColumns = node.table && dbSchema ? dbSchema[node.table] || [] : [];

    return (
        <Stack
            direction={{xs: "column", sm: "row"}}
            spacing={1}
            mt={1}
            alignItems="stretch"
            sx={{width: "100%"}}
        >
            <Box sx={{flex: 2}}>
                <Select
                    fullWidth
                    value={node.table}
                    onChange={(e) => updateNode({table: e.target.value})}
                    displayEmpty
                >
                    {sampleTables.map((tbl) => (
                        <MenuItem key={tbl} value={tbl}>{tbl}</MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{flex: 1}}>
                <Select
                    fullWidth
                    value={node.targetColumn}
                    onChange={(e) => updateNode({targetColumn: e.target.value})}
                    displayEmpty
                    disabled={targetColumns.length === 0}
                >
                    {targetColumns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{flex: 1}}>
                <Select
                    fullWidth
                    value={node.sourceColumn}
                    onChange={(e) => updateNode({sourceColumn: e.target.value})}
                    displayEmpty
                    disabled={sourceColumns.length === 0}
                >
                    {sourceColumns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </Select>
            </Box>
        </Stack>
    );
}