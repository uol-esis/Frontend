import {atom} from "jotai";

export type QueryNode =
    | { type: "aggregation"; column: string; agg: string; operator: string; value: string }
    | { type: "filter"; column: string; operator: string; value: string }
    | { type: "join"; table: string; sourceColumn: string; targetColumn: string }
    | { type: "orderBy"; column: string; direction: string };

export const selectedTableAtom = atom<string | null>(null);
export const selectedColumnAtom = atom<string[]>(["*"]);
export const queryChainAtom = atom<QueryNode[]>([]);

/*export const dbSchemaAtom = atom<DatabaseSchema | null>(null);

export type DatabaseSchema = {
    [tableName: string]: string[]; // z. B. { users: ["id", "name"], orders: ["id", "amount"] }
};*/

// 🆕 Default-Schema für Testzwecke
export type DatabaseSchema = {
    [tableName: string]: string[];
};

export const dbSchemaAtom = atom<DatabaseSchema>({
    users: ["id", "name", "email", "created_at"],
    orders: ["id", "user_id", "total", "status"],
    products: ["id", "name", "price", "stock"],
});