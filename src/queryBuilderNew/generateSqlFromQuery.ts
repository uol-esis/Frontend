import { QueryNode } from "./queryAtoms";

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
        } else if (node.type === "groupBy") {
            groupBy.push(node.column);
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