import React from "react";
import {MenuItem, Select, Stack, Box, TextField} from "@mui/material";
import {dbSchemaAtom, selectedTableAtom, QueryNode} from "./queryAtoms";
import {useAtom} from "jotai";

type Props = {
    node: QueryNode & { type: "orderBy" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

const directions = ["ASC", "DESC"];

export const SortNode: React.FC<Props> = ({node, updateNode}) => {
    const [selectedTable] = useAtom(selectedTableAtom);
    const [dbSchema] = useAtom(dbSchemaAtom);

    const columns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];

    return (
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} mt={1} sx={{width: "100%"}}>
            <Box sx={{flex: 1}}>
                <TextField
                    label="Spalte"
                    select
                    fullWidth
                    value={node.column}
                    onChange={(e) => updateNode({column: e.target.value})}
                >
                    {columns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{flex: 1}}>
                <TextField
                    label="Sortierreihenfolge"
                    select
                    fullWidth
                    value={node.direction}
                    onChange={(e) => updateNode({direction: e.target.value})}
                >
                    {directions.map((dir) => (
                        <MenuItem key={dir} value={dir}>{dir}</MenuItem>
                    ))}
                </TextField>
            </Box>
        </Stack>
    );
};
