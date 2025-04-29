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
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{width: "100%"}}
        >
            <Box sx={{flex: 1, maxWidth: 400}}>
                <Select fullWidth value={node.agg} onChange={(e) => updateNode({agg: e.target.value})}>
                    {aggregations.map((agg) => (
                        <MenuItem key={agg} value={agg}>{agg}</MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{flex: 1, maxWidth: 400}}>
                <Select fullWidth value={node.column} onChange={(e) => updateNode({column: e.target.value})}>
                    {columns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </Select>
            </Box>
        </Stack>
    );
}