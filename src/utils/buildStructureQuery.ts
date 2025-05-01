import {QueryNode} from "../atoms/queryAtoms";

export function generateSql(table: string, chain: QueryNode[]): string {
    let select = "SELECT *";
    let from = `FROM ${table}`;
    let where: string[] = [];
    let joins: string[] = [];
    let groupBy: string[] = [];
    let orderBy: string[] = [];

    chain.forEach((node) => {
        if (node.type === "filter") {
            where.push(`${node.column} ${node.operator} '${node.value}'`);
        } else if (node.type === "aggregation") {
            select = `SELECT ${node.agg}(${node.column})`;
            if (node.operator && node.value) {
                where.push(`${node.agg}(${node.column}) ${node.operator} '${node.value}'`);
            }
        } else if (node.type === "join") {
            joins.push(`JOIN ${node.table} ON ${table}.${node.sourceColumn} = ${node.table}.${node.targetColumn}`);
            //} else if (node.type === "groupBy") {
            //    groupBy.push(node.column);
        } else if (node.type === "orderBy") {
            orderBy.push(`${node.column} ${node.direction}`);
        }
    });

    const joinStr = joins.join(" ");
    const whereStr = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
    const groupByStr = groupBy.length > 0 ? `GROUP BY ${groupBy.join(", ")}` : "";
    const orderByStr = orderBy.length > 0 ? `ORDER BY ${orderBy.join(", ")}` : "";

    return `${select} ${from} ${joinStr} ${whereStr} ${groupByStr} ${orderByStr}`.trim();
}

export interface StructuredQuery {
    table: string;
    select: string[]; // z. B. ["*"] oder ["COUNT(id)"]
    joins?: {
        table: string;
        on: { sourceColumn: string; targetColumn: string };
    }[];
    filters?: {
        column: string;
        operator: string;
        value: string;
    }[];
    aggregations?: {
        column: string;
        agg: string;
        having?: { operator: string; value: string };
    }[];
    orderBy?: {
        column: string;
        direction: "ASC" | "DESC";
    }[];
}

export function buildStructuredQuery(table: string, chain: QueryNode[], selectedColumn: string[]): StructuredQuery {
    const query: StructuredQuery = {
        table,
        select: selectedColumn ?? ["*"],
    };

    for (const node of chain) {
        switch (node.type) {
            case "filter":
                query.filters ??= [];
                query.filters.push({
                    column: node.column,
                    operator: node.operator,
                    value: node.value,
                });
                break;

            case "aggregation":
                query.select = [`${node.agg}(${node.column})`];
                query.aggregations ??= [];
                query.aggregations.push({
                    column: node.column,
                    agg: node.agg,
                    having: node.operator && node.value
                        ? { operator: node.operator, value: node.value }
                        : undefined,
                });
                break;

            case "join":
                query.joins ??= [];
                query.joins.push({
                    table: node.table,
                    on: {
                        sourceColumn: node.sourceColumn,
                        targetColumn: node.targetColumn,
                    },
                });
                break;

            case "orderBy":
                query.orderBy ??= [];
                query.orderBy.push({
                    column: node.column,
                    direction: node.direction as "ASC" | "DESC",
                });
                break;
        }
    }
    return query;
}