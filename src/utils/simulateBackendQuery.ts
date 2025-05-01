import { StructuredQuery } from "./buildStructureQuery";

export const simulateBackendQuery = (query: StructuredQuery): Record<string, any>[] => {
    const mockDb: Record<string, any[]> = {
        users: [
            { id: 1, name: "Max", email: "max@example.com", created_at: "2022-01-01" },
            { id: 2, name: "Anna", email: "anna@example.com", created_at: "2022-02-01" },
            { id: 3, name: "Tom", email: "tom@example.com", created_at: "2023-03-15" },
            { id: 4, name: "Lisa", email: "lisa@example.com", created_at: "2021-12-11" },
            { id: 5, name: "John", email: "john@example.com", created_at: "2023-07-22" },
        ],
        orders: [
            { id: 1, user_id: 1, total: 100, status: "completed" },
            { id: 2, user_id: 2, total: 150, status: "pending" },
            { id: 3, user_id: 3, total: 200, status: "completed" },
            { id: 4, user_id: 4, total: 50, status: "cancelled" },
            { id: 5, user_id: 5, total: 300, status: "completed" },
            { id: 6, user_id: 1, total: 80, status: "pending" },
            { id: 7, user_id: 2, total: 120, status: "completed" },
        ],
        products: [
            { id: 1, name: "Laptop", price: 1200, stock: 10 },
            { id: 2, name: "Phone", price: 800, stock: 25 },
            { id: 3, name: "Tablet", price: 600, stock: 15 },
            { id: 4, name: "Monitor", price: 300, stock: 8 },
            { id: 5, name: "Keyboard", price: 100, stock: 50 },
            { id: 6, name: "Mouse", price: 50, stock: 100 },
            { id: 7, name: "Headphones", price: 150, stock: 30 },
        ],
    };

    let result = [...(mockDb[query.table] || [])];

    // Apply filters
    if (query.filters) {
        query.filters.forEach(({ column, operator, value }) => {
            result = result.filter((row) => {
                const cell = row[column];
                switch (operator) {
                    case "=":
                        return cell == value;
                    case "!=":
                        return cell != value;
                    case ">":
                        return cell > value;
                    case "<":
                        return cell < value;
                    case ">=":
                        return cell >= value;
                    case "<=":
                        return cell <= value;
                    default:
                        return true;
                }
            });
        });
    }

    // Apply joins
    if (query.joins && query.joins.length > 0) {
        query.joins.forEach(({ table, sourceColumn, targetColumn }) => {
            const joinTable = mockDb[table];

            if (!joinTable) return;

            // Verknüpfe jede Zeile in `result` mit den Zeilen der Join-Tabelle
            result = result.flatMap((row) => {
                const joinRows = joinTable.filter((joinRow) => joinRow[targetColumn] === row[sourceColumn]);

                // Kombiniere alle Treffer der Join-Tabelle mit der aktuellen Zeile
                return joinRows.map((joinRow) => ({
                    ...row,
                    ...joinRow,
                }));
            });
        });
    }

    // Apply aggregations
    if (query.aggregations && query.aggregations.length > 0) {
        const aggregatedResults = query.aggregations.map(({ column, agg, having }) => {
            const values = result.map(r => Number(r[column])).filter(v => !isNaN(v));

            const aggregatedValue = (() => {
                switch (agg) {
                    case "COUNT":
                        return values.length;
                    case "SUM":
                        return values.reduce((a, b) => a + b, 0);
                    case "AVG":
                        return values.reduce((a, b) => a + b, 0) / values.length || 0;
                    case "MIN":
                        return Math.min(...values);
                    case "MAX":
                        return Math.max(...values);
                    default:
                        return null;
                }
            })();

            // HAVING clause simulation
            if (having) {
                const pass = (() => {
                    switch (having.operator) {
                        case "=":
                            return aggregatedValue == Number(having.value);
                        case "!=":
                            return aggregatedValue != Number(having.value);
                        case ">":
                            return aggregatedValue > Number(having.value);
                        case "<":
                            return aggregatedValue < Number(having.value);
                        case ">=":
                            return aggregatedValue >= Number(having.value);
                        case "<=":
                            return aggregatedValue <= Number(having.value);
                        default:
                            return true;
                    }
                })();

                if (!pass) return null;
            }

            return {
                [`${agg}(${column})`]: aggregatedValue
            };
        }).filter((r): r is Record<string, any> => r !== null);

        return aggregatedResults;
    }

    // Apply sorting (only if no aggregation was returned)
    if (query.orderBy && query.orderBy.length > 0) {
        result.sort((a, b) => {
            for (const {column, direction} of query.orderBy) {
                const valA = a[column];
                const valB = b[column];

                if (valA < valB) return direction === "ASC" ? -1 : 1;
                if (valA > valB) return direction === "ASC" ? 1 : -1;
                // continue to next column if equal
            }
            return 0;
        });
    }

    // ✅ Nur ausgewählte Spalten zurückgeben
    if (query.select && query.select.length > 0 && !query.select.includes("*")) {
        result = result.map((row) => {
            const filtered: Record<string, any> = {};
            query.select.forEach((col) => {
                if (col in row) filtered[col] = row[col];
            });
            return filtered;
        });
    }

    // Fallback: normale Datenzeilen (kein Aggregat)
    return result;
};
