import React from 'react';
import {Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography} from '@mui/material';

export default function FilterOption({
                                         filters,
                                         setFilters,
                                         tables,
                                         selectedTable,
                                     }: {
    filters: { column: string; value: string }[];
    setFilters: React.Dispatch<React.SetStateAction<{ column: string; value: string }[]>>;
    tables: { [key: string]: string[] };
    selectedTable: string;
}) {
    return (
        <Box sx={{ my: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Column</InputLabel>
                    <Select
                        value={filters[0]?.column || ''}
                        onChange={(e) => {
                            const newFilters = [...filters];
                            newFilters[0].column = e.target.value;
                            setFilters(newFilters);
                        }}
                        label="Column"
                    >
                        {tables[selectedTable].map((col) => (
                            <MenuItem key={col} value={col}>
                                {col}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Value"
                    value={filters[0]?.value || ''}
                    onChange={(e) => {
                        const newFilters = [...filters];
                        newFilters[0].value = e.target.value;
                        setFilters(newFilters);
                    }}
                />
            </Box>
        </Box>
    );
}
