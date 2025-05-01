import React from "react";
import {MenuItem, Select, TextField, Grid, Stack, Box} from "@mui/material";
import {
    dbSchemaAtom,
    QueryNode,
    selectableColumnsAtom,
    selectedColumnAtom,
    selectedTableAtom
} from "../../../atoms/queryAtoms";
import {useAtom} from "jotai";
import {TableSelect} from "@/components/shared/TableSelect";
import {ColumnSelect} from "../../shared/ColumnSelect";

const columns = ["id", "name", "age", "price", "created_at"];
const operators = ["=", "!=", ">", "<", ">=", "<="];

type Props = {
    node: QueryNode & { type: "filter" };
    updateNode: (updates: Partial<QueryNode>) => void;
};

export const FilterNode: React.FC<Props> = ({node, updateNode}) => {
    const [selectedTable] = useAtom(selectedTableAtom);
    const [dbSchema] = useAtom(dbSchemaAtom);
    const [selectedColumns, setSelectedColumns] = useAtom(selectedColumnAtom);
    const [selectableColumns, setSelectableColumns] = useAtom(selectableColumnsAtom);

    //const columns = selectedTable && dbSchema ? dbSchema[selectedTable] || [] : [];

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
               {/* <TextField
                    label="Spalte"
                    select
                    fullWidth
                    value={node.column}
                    onChange={(e) => updateNode({column: e.target.value})}
                >
                    {columns.map((col) => (
                        <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                </TextField>*/}
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