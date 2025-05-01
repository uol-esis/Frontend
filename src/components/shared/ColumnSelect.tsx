import {TextField, MenuItem} from "@mui/material";
import React from "react";
import {QueryNode} from "@/atoms/queryAtoms";

type Props = {
    tables: string[];
    value: string;
    onChange: (value:  Partial<QueryNode>) => void;
};

export const ColumnSelect: React.FC<Props> = ({tables, value, onChange}) => (
    <TextField
        label="Spalte"
        select
        fullWidth
        value={value}
        onChange={(e) => onChange({column: e.target.value})}
    >
        {tables.map((t) => (
            <MenuItem key={t} value={t}>
                {t}
            </MenuItem>
        ))}
    </TextField>
);
