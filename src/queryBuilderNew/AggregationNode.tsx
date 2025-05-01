import React from "react";
import {MenuItem, Select, TextField, Grid, Stack, Box} from "@mui/material";
import {dbSchemaAtom, QueryNode, selectedTableAtom} from "./queryAtoms";
import {useAtom} from "jotai";

const aggregations = ["COUNT", "MIN", "MAX", "AVG"];

type Props = {
    node: QueryNode & { type: "aggregation" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

export const AggregationNode: React.FC<Props> = ({node, updateNode}) => {
    const [dbSchema] = useAtom(dbSchemaAtom);
    const [selectedTable] = useAtom(selectedTableAtom);
    const columns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];

    return (
        <Stack
            direction={{xs: "column", sm: "row"}}
            spacing={1}
            mt={1}
            alignItems="stretch"
            sx={{width: "100%"}}
        >
            <Box sx={{flex: 1}}>
                <TextField
                    label="Aggregation"
                    select
                    fullWidth
                    value={node.agg}
                    onChange={(e) => updateNode({agg: e.target.value})}>
                    {aggregations.map((agg) => (
                        <MenuItem key={agg} value={agg}>{agg}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{flex: 1}}>
                <TextField
                    label="Spalte"
                    select
                    fullWidth
                    value={node.column}
                    onChange={(e) => updateNode({column: e.target.value})}>
                    {columns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </TextField>
            </Box>
        </Stack>
    );
}