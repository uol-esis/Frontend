import React from "react";
import {MenuItem, TextField, Stack, Box} from "@mui/material";
import {
    QueryNode,
    selectableColumnsAtom,
    selectedColumnAtom,
} from "../../../atoms/queryAtoms";
import {useAtom} from "jotai";
import {ColumnSelect} from "../../shared/ColumnSelect";

const operators = ["=", "!=", ">", "<", ">=", "<="];

type Props = {
    node: QueryNode & { type: "filter" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

export const FilterNode: React.FC<Props> = ({node, updateNode}) => {
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
                <ColumnSelect
                    tables={columnsToUse}
                    value={node.column}
                    onChange={updateNode}
                />
            </Box>
            <Box sx={{flex: 1}}>
                <TextField
                    label="Operator"
                    select
                    fullWidth
                    value={node.operator}
                    onChange={(e) => updateNode({operator: e.target.value})}
                >
                    {operators.map((op) => (
                        <MenuItem key={op} value={op}>{op}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{flex: 2}}>
                <TextField
                    label="Filter Wert"
                    fullWidth
                    value={node.value}
                    onChange={(e) => updateNode({value: e.target.value})}
                />
            </Box>
        </Stack>
    );
}