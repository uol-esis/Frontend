// QueryBuilder.tsx

import React from 'react';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Divider, Chip } from '@mui/material';
import { useQueryBuilder } from './queryBuilderHooks';
import AggregationOption from './AggregationOption';
import FilterOption from './FilterOption';
import JoinOption from './JoinOption';

export default function QueryBuilder() {
    const {
        selectedTable,
        setSelectedTable,
        options,
        handleAddOption,
        handleRemoveOption,
        filters,
        setFilters,
        joinTable,
        setJoinTable,
        joinColumn,
        setJoinColumn,
        joinCondition,
        setJoinCondition,
        tables,
        generateSQL,
    } = useQueryBuilder();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Query Builder</Typography>

            <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Table</InputLabel>
                <Select
                    value={selectedTable}
                    onChange={(e) => {
                        setSelectedTable(e.target.value);
                    }}
                    label="Table"
                >
                    {Object.keys(tables).map((table) => (
                        <MenuItem key={table} value={table}>{table}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedTable && (
                <>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h6">Add Operation</Typography>
                        <Button onClick={() => handleAddOption('aggregation')} sx={{ mr: 2 }} variant="outlined">Apply Aggregation</Button>
                        <Button onClick={() => handleAddOption('filter')} sx={{ mr: 2 }} variant="outlined">Apply Filter</Button>
                        <Button onClick={() => handleAddOption('join')} sx={{ mr: 2 }} variant="outlined">Add Join</Button>
                    </Box>

                    <Box sx={{ my: 2 }}>
                        <Typography variant="h6">Added Operations</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {options.map((option) => (
                                <Chip
                                    key={option.id}
                                    label={option.type}
                                    onDelete={() => handleRemoveOption(option.id)}
                                    color="primary"
                                />
                            ))}
                        </Box>
                    </Box>

                    {options.map((option) => {
                        if (option.type === 'aggregation') {
                            return <AggregationOption key={option.id} selectedTable={selectedTable} />;
                        }

                        if (option.type === 'filter') {
                            return <FilterOption key={option.id} filters={filters} setFilters={setFilters} tables={tables} selectedTable={selectedTable} />;
                        }

                        if (option.type === 'join') {
                            return <JoinOption key={option.id} joinTable={joinTable} setJoinTable={setJoinTable} joinColumn={joinColumn} setJoinColumn={setJoinColumn} joinCondition={joinCondition} setJoinCondition={setJoinCondition} tables={tables} />;
                        }

                        return null;
                    })}

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6">Generated SQL</Typography>
                    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mt: 1 }}>
                        <pre>{generateSQL()}</pre>
                    </Box>
                </>
            )}
        </Container>
    );
}
