import React from "react";
import { Stack, Box, TextField, MenuItem } from "@mui/material";
import { useAtom } from "jotai";
import {
    selectedColumnAtom,
    selectableColumnsAtom, QueryNode
} from "../../../atoms/queryAtoms";
import { ColumnSelect } from "../../shared/ColumnSelect";

type Props = {
    node: { type: "groupBy"; column: string };
    updateNode: (updates: Partial<QueryNode>) => void;
};

export const GroupByNode: React.FC<Props> = ({ node, updateNode }) => {
    const [selectedColumns] = useAtom(selectedColumnAtom);
    const [selectableColumns] = useAtom(selectableColumnsAtom);

    const columnsToUse = selectedColumns.includes("*")
        ? selectableColumns
        : selectedColumns;

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            mt={1}
            sx={{ width: "100%" }}
        >
            <Box sx={{ flex: 1 }}>
                <ColumnSelect
                    tables={columnsToUse}
                    value={node.column}
                    onChange={updateNode}
                />
            </Box>
        </Stack>
    );
};
