import React from "react";
import { useAtom } from "jotai";
import { queryChainAtom, QueryNode } from "./queryAtoms";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterNode } from "./FilterNode";
import { AggregationNode } from "./AggregationNode";
import { JoinNode } from "./JoinNode";

export const QueryNodeComponent = ({ node, index }: { node: QueryNode; index: number }) => {
    const [chain, setChain] = useAtom(queryChainAtom);

    const updateNode = (updates: Partial<QueryNode>) => {
        const updated = [...chain];
        updated[index] = { ...updated[index], ...updates };
        setChain(updated);
    };

    const removeNode = () => {
        const updated = [...chain];
        updated.splice(index, 1);
        setChain(updated);
    };

    const renderFields = () => {
        switch (node.type) {
            case "filter":
                return <FilterNode node={node} updateNode={updateNode} />;
            case "aggregation":
                return <AggregationNode node={node} updateNode={updateNode} />;
            case "join":
                return <JoinNode node={node} updateNode={updateNode} />;
        }
    };

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle1">{node.type.toUpperCase()}</Typography>
                    <IconButton onClick={removeNode} size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
                {renderFields()}
            </CardContent>
        </Card>
    );
};
