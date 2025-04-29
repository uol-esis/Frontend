// JoinOption.tsx

import React from 'react';
import {Box, FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';

export default function JoinOption(
    {
        joinTable,
        setJoinTable,
        joinColumn,
        setJoinColumn,
        joinCondition,
        setJoinCondition,
        tables,
    }: {
        joinTable: string;
        setJoinTable: React.Dispatch<React.SetStateAction<string>>;
        joinColumn: string;
        setJoinColumn: React.Dispatch<React.SetStateAction<string>>;
        joinCondition: string;
        setJoinCondition: React.Dispatch<React.SetStateAction<string>>;
        tables: { [key: string]: string[] };
    }) {
    return (
        <Box sx={{my: 2}}>
            <FormControl fullWidth sx={{my: 2}}>
                <InputLabel>Join Table</InputLabel>
                <Select
                    value={joinTable}
                    onChange={(e) => setJoinTable(e.target.value)}
                >
                    {Object.keys(tables).map((table) => (
                        <MenuItem key={table} value={table}>{table}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{my: 2}}>
                <InputLabel>Join Column</InputLabel>
                <Select
                    value={joinColumn}
                    onChange={(e) => setJoinColumn(e.target.value)}
                >
                    {tables[joinTable].map((column) => (
                        <MenuItem key={column} value={column}>{column}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Join Condition (e.g., =, >, <)"
                value={joinCondition}
                onChange={(e) => setJoinCondition(e.target.value)}
                fullWidth
                sx={{my: 1}}
            />
        </Box>
    );
}
