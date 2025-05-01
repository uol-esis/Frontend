import React from "react";
import {MenuItem, Select, Grid, Stack, Box, TextField} from "@mui/material";
import {dbSchemaAtom, QueryNode, selectedTableAtom} from "../../../atoms/queryAtoms";
import {useAtom} from "jotai";

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
                <TextField
                    label="Tabelle Join"
                    select
                    fullWidth
                    value={node.table}
                    onChange={(e) => updateNode({table: e.target.value})}
                >
                    {sampleTables.map((tbl) => (
                        <MenuItem key={tbl} value={tbl}>{tbl}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{flex: 1}}>
                <TextField
                    label="Spalte Join"
                    select
                    fullWidth
                    value={node.targetColumn}
                    onChange={(e) => updateNode({targetColumn: e.target.value})}
                    disabled={targetColumns.length === 0}
                >
                    {targetColumns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{flex: 1}}>
                <TextField
                    label="Spalte"
                    select
                    fullWidth
                    value={node.sourceColumn}
                    onChange={(e) => updateNode({sourceColumn: e.target.value})}
                    disabled={sourceColumns.length === 0}
                >
                    {sourceColumns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </TextField>
            </Box>
        </Stack>
    );
}