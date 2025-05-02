import {TextField, MenuItem} from "@mui/material";
import React from "react";
import {useAtom} from "jotai/index";
import {dbSchemaAtom, selectableColumnsAtom} from "../../atoms/queryAtoms";

type Props = {
    tables: string[];
    value: string;
    onChange: (value: string) => void;
};

export const TableSelect: React.FC<Props> = ({tables, value, onChange}) => {
    const [dbSchema] = useAtom(dbSchemaAtom);
    const [, setSelectableColumns] = useAtom(selectableColumnsAtom);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTable = event.target.value;
        const newColumns = dbSchema?.[newTable] || [];
        setSelectableColumns(newColumns);
        onChange(newTable);
    };

    const renderTableOptions = (tables: string[]) =>
        tables.map((table) => (
            <MenuItem key={table} value={table}>
                {table}
            </MenuItem>
        ));

    return (
        <TextField
            label="Tabelle"
            select
            fullWidth
            value={value}
            onChange={handleChange}
        >
            {renderTableOptions(tables)}
        </TextField>
    );
};
