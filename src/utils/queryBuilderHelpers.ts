// utils/queryBuilderHelpers.ts
import "jotai";
import {QueryNode, queryResultsAtom} from "../atoms/queryAtoms";
import { buildStructuredQuery } from "./buildStructureQuery";
import { simulateBackendQuery } from "./simulateBackendQuery";

export const fetchSimulatedSchema = async () => {
    return {
        users: ["id", "name", "email", "created_at"],
        orders: ["id", "user_id", "total", "status"],
        products: ["id", "name", "price", "stock"],
    };
};

export const addFilterNode = (columns: string[]): QueryNode | null => {
    if (!columns.length) return null;
    return { type: "filter", column: columns[0], operator: "=", value: "" };
};

export const addAggregationNode = (columns: string[]): QueryNode | null => {
    if (!columns.length) return null;
    return {
        type: "aggregation",
        column: columns[0],
        agg: "COUNT",
        operator: "=",
        value: "",
    };
};

export const addJoinNode = (columns: string[], tables: string[]): QueryNode | null => {
    if (!columns.length || !tables.length) return null;
    return {
        type: "join",
        table: tables[0],
        sourceColumn: columns[0],
        targetColumn: columns[0],
    };
};

export const addSortNode = (columns: string[]): QueryNode | null => {
    if (!columns.length) return null;
    return {
        type: "orderBy",
        column: columns[0],
        direction: "ASC",
    };
};

export const runQuery = (
    selectedTable: string,
    chain: QueryNode[],
    selectedColumns: string[],
    setQueryResults: (result: any) => void // <- Setter als Argument
) => {
    const query = buildStructuredQuery(selectedTable, chain, selectedColumns);
    const result:Record<string, any>[] = simulateBackendQuery(query);
    console.log(result);
    setQueryResults(result);
};
