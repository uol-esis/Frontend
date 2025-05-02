// components/builder/QueryControls.tsx
import {Button, Grid, Stack} from "@mui/material";
import React from "react";

type Props = {
    onAddFilter: () => void;
    onAddAggregation: () => void;
    onAddGroupBy: () => void;
    onAddSort: () => void;
    onAddJoin: () => void;
    onRunQuery: () => void;
};

export const QueryControls: React.FC<Props> = (
    {
        onAddFilter,
        onAddAggregation,
        onAddGroupBy,
        onAddSort,
        onAddJoin,
        onRunQuery,
    }) => (
    <Grid container spacing={1.5} mb={2}>
        <Grid item sx={{ flexGrow: 1 }}>
            <Button variant="outlined" onClick={onAddFilter} fullWidth>
                Filter
            </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
            <Button variant="outlined" onClick={onAddSort} fullWidth>
                Sort
            </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
            <Button variant="outlined" onClick={onAddAggregation} fullWidth>
                Aggregation
            </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
            <Button variant="outlined" onClick={onAddGroupBy} fullWidth>
                Group By
            </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
            <Button variant="outlined" onClick={onAddJoin} fullWidth>
                Join
            </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 2 }}>
            <Button variant="contained" onClick={onRunQuery} fullWidth>
                Ausführen
            </Button>
        </Grid>
    </Grid>
);
