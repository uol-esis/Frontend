import { TextField, MenuItem } from "@mui/material";
import React from "react";

type Props = {
    tables: string[];
    value: string;
    onChange: (value: string) => void;
};

export const TableSelect: React.FC<Props> = ({ tables, value, onChange }) => (
    <TextField
        label="Tabelle"
        select
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
    >
        {tables.map((t) => (
            <MenuItem key={t} value={t}>
                {t}
            </MenuItem>
        ))}
    </TextField>
);
