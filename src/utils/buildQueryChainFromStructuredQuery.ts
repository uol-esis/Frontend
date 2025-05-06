import {QueryNode} from "@/atoms/queryAtoms";
import {StructuredQuery} from "@/utils/buildStructureQuery";

export function buildQueryChainFromStructuredQuery(struct: StructuredQuery): QueryNode[] {
    const chain: QueryNode[] = [];

    if (struct.joins) {
        for (const join of struct.joins) {
            chain.push({
                type: "join",
                table: join.table,
                sourceColumn: join.sourceColumn,
                targetColumn: join.targetColumn,
            });
        }
    }

    if (struct.filters) {
        for (const filter of struct.filters) {
            chain.push({
                type: "filter",
                column: filter.column,
                operator: filter.operator,
                value: filter.value,
            });
        }
    }

    if (struct.aggregations) {
        for (const agg of struct.aggregations) {
            chain.push({
                type: "aggregation",
                column: agg.column,
                agg: agg.agg,
                operator: agg.having?.operator ?? "",
                value: agg.having?.value ?? "",
            });
        }
    }

    if (struct.groupBy) {
        for (const col of struct.groupBy) {
            chain.push({
                type: "groupBy",
                column: col,
            });
        }
    }

    if (struct.orderBy) {
        for (const order of struct.orderBy) {
            chain.push({
                type: "orderBy",
                column: order.column,
                direction: order.direction,
            });
        }
    }

    return chain;
}
