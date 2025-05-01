// components/builder/QueryControls.tsx
import {Button, Stack} from "@mui/material";
import React from "react";

type Props = {
    onAddFilter: () => void;
    onAddAggregation: () => void;
    onAddSort: () => void;
    onAddJoin: () => void;
    onRunQuery: () => void;
};

export const QueryControls: React.FC<Props> = (
    {
        onAddFilter,
        onAddAggregation,
        onAddSort,
        onAddJoin,
        onRunQuery,
    }) => (
    <Stack direction="row" spacing={1.5} mb={2}>
        <Button variant="outlined" onClick={onAddFilter} sx={{flex: 1}}>
            Filter
        </Button>
        <Button variant="outlined" onClick={onAddSort} sx={{flex: 1}}>
            Sort
        </Button>
        <Button variant="outlined" onClick={onAddAggregation} sx={{flex: 1}}>
            Aggregation
        </Button>
        <Button variant="outlined" onClick={onAddJoin} sx={{flex: 1}}>
            Join
        </Button>
        <Button variant="contained" onClick={onRunQuery} sx={{flex: 2}}>
            Ausführen
        </Button>
    </Stack>
);
