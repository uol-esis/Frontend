import React from 'react';
import {Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

export default function AggregationOption({selectedTable}: { selectedTable: string }) {
    return (
        <Box sx={{my: 2}}>
            <FormControl fullWidth>
                <InputLabel>Aggregate Function</InputLabel>
                <Select>
                    {['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'].map((func) => (
                        <MenuItem key={func} value={func}>{func}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{my: 2}}>
                <InputLabel>Aggregate Column</InputLabel>
                <Select>
                    {['id', 'name', 'email'].map((column) => (
                        <MenuItem key={column} value={column}>{column}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
