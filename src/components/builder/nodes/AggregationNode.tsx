import React from "react";
import {MenuItem, TextField, Stack, Box} from "@mui/material";
import {
    QueryNode,
    selectableColumnsAtom,
    selectedColumnAtom,
} from "../../../atoms/queryAtoms";
import {useAtom} from "jotai";
import {ColumnSelect} from "../../shared/ColumnSelect";

const aggregations = ["COUNT", "MIN", "MAX", "AVG"];

type Props = {
    node: QueryNode & { type: "aggregation" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

export const AggregationNode: React.FC<Props> = ({node, updateNode}) => {
    const [selectedColumns] = useAtom(selectedColumnAtom);
    const [selectableColumns] = useAtom(selectableColumnsAtom);

    const columnsToUse = selectedColumns.includes("*")
        ? selectableColumns
        : selectedColumns;

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
                <ColumnSelect
                    tables={columnsToUse}
                    value={node.column}
                    onChange={updateNode}
                />
            </Box>
        </Stack>
    );
}