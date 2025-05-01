import { MenuItem, Select } from "@mui/material";
import React from "react";

type Props = {
    columns: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
};

export const ColumnSelect: React.FC<Props> = ({ columns, selected, onChange }) => (
    <Select
        multiple
        value={selected}
        onChange={(e) => {
            let value = typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value;

            if (value.includes("*")) {
                value = ["*"];
            } else {
                value = value.filter((v) => v !== "*");
            }

            onChange(value);
        }}
        renderValue={(selected) => selected.join(", ")}
        fullWidth
    >
        <MenuItem value="*">Alle</MenuItem>
        {columns.map((col) => (
            <MenuItem key={col} value={col}>
                {col}
            </MenuItem>
        ))}
    </Select>
);
