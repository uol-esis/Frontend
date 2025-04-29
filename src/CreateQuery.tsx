import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Divider,
    Chip
} from '@mui/material';

const tables = {
    users: ['id', 'name', 'email'],
    orders: ['id', 'user_id', 'amount'],
    products: ['id', 'name', 'price']
};

export default function QueryBuilder() {
    const [selectedTable, setSelectedTable] = useState('');
    const [options, setOptions] = useState<any[]>([]); // Holds added options (aggregation, filter, join)
    const [filters, setFilters] = useState<{ column: string; value: string }[]>([]);
    const [joinTable, setJoinTable] = useState('');
    const [joinColumn, setJoinColumn] = useState('');
    const [joinCondition, setJoinCondition] = useState('');

    const handleAddOption = (optionType: 'aggregation' | 'filter' | 'join') => {
        const newOption = {
            type: optionType,
            id: Date.now(), // Use timestamp as unique id
        };

        setOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const handleRemoveOption = (id: number) => {
        setOptions((prevOptions) => prevOptions.filter(option => option.id !== id));
    };

    const generateSQL = () => {
        if (!selectedTable) return '';
        let sql = `SELECT ${tables[selectedTable].join(', ')}`;

        // Apply each option added by user
        options.forEach(option => {
            switch (option.type) {
                case 'aggregation':
                    // Example aggregation: COUNT(column_name)
                    sql += `, COUNT(${tables[selectedTable][0]})`; // You can customize this based on selected column
                    break;
                case 'filter':
                    if (filters.length > 0) {
                        const where = filters
                            .filter(f => f.column && f.value)
                            .map(f => `${f.column} = '${f.value}'`)
                            .join(' AND ');
                        if (where) sql += ` WHERE ${where}`;
                    }
                    break;
                case 'join':
                    if (joinTable && joinColumn && joinCondition) {
                        sql += ` JOIN ${joinTable} ON ${selectedTable}.${joinColumn} ${joinCondition} ${joinTable}.${joinColumn}`;
                    }
                    break;
                default:
                    break;
            }
        });

        return sql;
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Query Builder
            </Typography>

            <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Table</InputLabel>
                <Select
                    value={selectedTable}
                    onChange={(e) => {
                        setSelectedTable(e.target.value);
                        setOptions([]);  // Reset options if a new table is selected
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
                        <Button onClick={() => handleAddOption('aggregation')} sx={{ mr: 2 }} variant="outlined">
                            Apply Aggregation
                        </Button>
                        <Button onClick={() => handleAddOption('filter')} sx={{ mr: 2 }} variant="outlined">
                            Apply Filter
                        </Button>
                        <Button onClick={() => handleAddOption('join')} sx={{ mr: 2 }} variant="outlined">
                            Add Join
                        </Button>
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
                            return (
                                <Box key={option.id} sx={{ my: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Aggregate Function</InputLabel>
                                        <Select
                                            // Add state logic for aggregation here
                                        >
                                            {['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'].map((func) => (
                                                <MenuItem key={func} value={func}>{func}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth sx={{ my: 2 }}>
                                        <InputLabel>Aggregate Column</InputLabel>
                                        <Select
                                            // Add state logic for selecting column
                                        >
                                            {tables[selectedTable].map((column) => (
                                                <MenuItem key={column} value={column}>{column}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            );
                        }

                        if (option.type === 'filter') {
                            return (
                                <Box key={option.id} sx={{ my: 2 }}>
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

                        if (option.type === 'join') {
                            return (
                                <Box key={option.id} sx={{ my: 2 }}>
                                    <FormControl fullWidth sx={{ my: 2 }}>
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

                                    <FormControl fullWidth sx={{ my: 2 }}>
                                        <InputLabel>Join Column</InputLabel>
                                        <Select
                                            value={joinColumn}
                                            onChange={(e) => setJoinColumn(e.target.value)}
                                        >
                                            {tables[selectedTable].map((column) => (
                                                <MenuItem key={column} value={column}>{column}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label="Join Condition (e.g., =, >, <)"
                                        value={joinCondition}
                                        onChange={(e) => setJoinCondition(e.target.value)}
                                        fullWidth
                                        sx={{ my: 1 }}
                                    />
                                </Box>
                            );
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
