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
  Divider
} from '@mui/material';

const tables = {
  users: ['id', 'name', 'email'],
  orders: ['id', 'user_id', 'amount'],
  products: ['id', 'name', 'price']
};

export default function QueryBuilder() {
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<{ column: string; alias: string }[]>([]);
  const [filters, setFilters] = useState<{ column: string; value: string }[]>([]);
  const [sortColumn, setSortColumn] = useState('');
  const [joinTable, setJoinTable] = useState('');
  const [joinColumn, setJoinColumn] = useState('');
  const [joinCondition, setJoinCondition] = useState('');
  const [groupByColumn, setGroupByColumn] = useState('');
  const [aggregateFunc, setAggregateFunc] = useState('');
  const [aggregateColumn, setAggregateColumn] = useState('');

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', value: '' }]);
  };

  const handleColumnSelect = (newColumns: string[]) => {
    const updated = newColumns.map(col => {
      const existing = selectedColumns.find(c => c.column === col);
      return existing || { column: col, alias: '' };
    });
    setSelectedColumns(updated);
  };

  const generateSQL = () => {
    if (!selectedTable || selectedColumns.length === 0) return '';
    let sql = 'SELECT ';

    const columnSelections = selectedColumns.map(({ column, alias }) =>
        alias ? `${column} AS ${alias}` : column
    );
    if (aggregateFunc && aggregateColumn) {
      columnSelections.push(`${aggregateFunc}(${aggregateColumn})`);
    }

    sql += columnSelections.join(', ');
    sql += ` FROM ${selectedTable}`;

    if (joinTable && joinColumn && joinCondition) {
      sql += ` JOIN ${joinTable} ON ${joinTable}.${joinColumn} ${joinCondition}`;
    }

    if (filters.length > 0) {
      const where = filters
          .filter(f => f.column && f.value)
          .map(f => `${f.column} = '${f.value}'`)
          .join(' AND ');
      if (where) sql += ` WHERE ${where}`;
    }

    if (groupByColumn) {
      sql += ` GROUP BY ${groupByColumn}`;
    }

    if (sortColumn) sql += ` ORDER BY ${sortColumn}`;
    return sql;
  };

  return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>Query Builder</Typography>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Table</InputLabel>
          <Select
              value={selectedTable}
              onChange={(e) => {
                setSelectedTable(e.target.value);
                setSelectedColumns([]);
                setFilters([]);
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
              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Columns</InputLabel>
                <Select
                    multiple
                    value={selectedColumns.map(c => c.column)}
                    onChange={(e) => handleColumnSelect(e.target.value as string[])}
                    label="Columns"
                    renderValue={(selected) => (selected as string[]).join(', ')}
                >
                  {tables[selectedTable].map((column) => (
                      <MenuItem key={column} value={column}>{column}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedColumns.map((col, idx) => (
                  <TextField
                      key={col.column}
                      label={`Alias for ${col.column}`}
                      value={col.alias}
                      onChange={(e) => {
                        const newCols = [...selectedColumns];
                        newCols[idx].alias = e.target.value;
                        setSelectedColumns(newCols);
                      }}
                      fullWidth
                      sx={{ my: 1 }}
                  />
              ))}

              {/* Join Section */}
              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Join Table</InputLabel>
                <Select
                    value={joinTable}
                    onChange={(e) => setJoinTable(e.target.value)}
                    label="Join Table"
                >
                  {Object.keys(tables).map((table) => (
                      <MenuItem key={table} value={table}>{table}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {joinTable && (
                  <>
                    <FormControl fullWidth sx={{ my: 2 }}>
                      <InputLabel>Join Column</InputLabel>
                      <Select
                          value={joinColumn}
                          onChange={(e) => setJoinColumn(e.target.value)}
                          label="Join Column"
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
                        sx={{ my: 1 }}
                    />
                  </>
              )}

              {/* Filters, Sort, Group, Aggregation */}
              <Box sx={{ my: 2 }}>
                <Typography variant="h6">Filters</Typography>
                {filters.map((filter, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Column</InputLabel>
                        <Select
                            value={filter.column}
                            onChange={(e) => {
                              const newFilters = [...filters];
                              newFilters[idx].column = e.target.value;
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
                          value={filter.value}
                          onChange={(e) => {
                            const newFilters = [...filters];
                            newFilters[idx].value = e.target.value;
                            setFilters(newFilters);
                          }}
                      />
                    </Box>
                ))}
                <Button onClick={handleAddFilter} sx={{ mt: 2 }} variant="outlined">
                  Add Filter
                </Button>
              </Box>

              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortColumn}
                    onChange={(e) => setSortColumn(e.target.value)}
                    label="Sort By"
                >
                  {tables[selectedTable].map((column) => (
                      <MenuItem key={column} value={column}>
                        {column}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Group By</InputLabel>
                <Select
                    value={groupByColumn}
                    onChange={(e) => setGroupByColumn(e.target.value)}
                    label="Group By"
                >
                  {tables[selectedTable].map((column) => (
                      <MenuItem key={column} value={column}>
                        {column}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Aggregate Function</InputLabel>
                  <Select
                      value={aggregateFunc}
                      onChange={(e) => setAggregateFunc(e.target.value)}
                      label="Aggregate Function"
                  >
                    {['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'].map(func => (
                        <MenuItem key={func} value={func}>{func}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Aggregate Column</InputLabel>
                  <Select
                      value={aggregateColumn}
                      onChange={(e) => setAggregateColumn(e.target.value)}
                      label="Aggregate Column"
                  >
                    {tables[selectedTable].map((column) => (
                        <MenuItem key={column} value={column}>{column}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

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
