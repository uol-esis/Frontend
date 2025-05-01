import {MenuItem, Select} from "@mui/material";
import React from "react";
import {addFilterNode} from "@/utils/queryBuilderHelpers";
import {useAtom} from "jotai/index";
import {selectableColumnsAtom, selectedColumnAtom} from "../../atoms/queryAtoms";

type Props = {
    columns: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
};

export const ColumnMultiSelect: React.FC<Props> = ({columns, selected, onChange}) => {
    const [, setSelectedColumns] = useAtom(selectedColumnAtom);
    const [selectableColumns, setSelectableColumns] = useAtom(selectableColumnsAtom);

    return (
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

                setSelectedColumns(value);

                onChange(value);
            }}
            renderValue={(selected) => selected.join(", ")}
            fullWidth
        >
            <MenuItem value="*">Alle</MenuItem>
            {selectableColumns.map((col) => (
                <MenuItem key={col} value={col}>
                    {col}
                </MenuItem>
            ))}
        </Select>
    );
}

