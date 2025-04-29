import { useState } from 'react';

// Zustand für die Auswahl der Tabelle und das Hinzufügen von Optionen
export function useQueryBuilder() {
    const [selectedTable, setSelectedTable] = useState<string>('');
    const [options, setOptions] = useState<any[]>([]); // Operationen wie Aggregation, Filter, Join
    const [filters, setFilters] = useState<{ column: string; value: string }[]>([]);
    const [joinTable, setJoinTable] = useState<string>('');
    const [joinColumn, setJoinColumn] = useState<string>('');
    const [joinCondition, setJoinCondition] = useState<string>('');

    const tables = {
        users: ['id', 'name', 'email'],
        orders: ['id', 'user_id', 'amount'],
        products: ['id', 'name', 'price'],
    };

    // Funktion, um eine neue Option hinzuzufügen
    const handleAddOption = (optionType: 'aggregation' | 'filter' | 'join') => {
        const newOption = {
            type: optionType,
            id: Date.now(), // Verwenden eines Zeitstempels als eindeutige ID
        };
        setOptions((prevOptions) => [...prevOptions, newOption]);
    };

    // Funktion zum Entfernen einer Option
    const handleRemoveOption = (id: number) => {
        setOptions((prevOptions) => prevOptions.filter(option => option.id !== id));
    };

    // Funktion, um die SQL-Abfrage zu generieren
    const generateSQL = () => {
        if (!selectedTable) return '';
        let sql = `SELECT ${tables[selectedTable].join(', ')}`;

        options.forEach(option => {
            switch (option.type) {
                case 'aggregation':
                    sql += `, COUNT(${tables[selectedTable][0]})`; // Aggregation (z.B. COUNT)
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

    return {
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
    };
}
