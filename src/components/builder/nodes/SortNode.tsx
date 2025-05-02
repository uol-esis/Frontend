import React from "react";
import {MenuItem, Stack, Box, TextField} from "@mui/material";
import {
    QueryNode,
    selectedColumnAtom,
    selectableColumnsAtom
} from "../../../atoms/queryAtoms";
import {useAtom} from "jotai";
import {ColumnSelect} from "../../shared/ColumnSelect";

type Props = {
    node: QueryNode & { type: "orderBy" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

const directions = ["ASC", "DESC"];

export const SortNode: React.FC<Props> = ({node, updateNode}) => {
    const [selectedColumns] = useAtom(selectedColumnAtom);
    const [selectableColumns] = useAtom(selectableColumnsAtom);

    const columnsToUse = selectedColumns.includes("*")
        ? selectableColumns
        : selectedColumns;

    return (
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} mt={1} sx={{width: "100%"}}>
            <Box sx={{flex: 1}}>
                <ColumnSelect
                    tables={columnsToUse}
                    value={node.column}
                    onChange={updateNode}
                />
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
