import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

interface TableDisplayProps {
    data: Record<string, any>[];
}

export const TableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <Typography variant="body1">Keine Daten gefunden.</Typography>;
    }

    const columns = Object.keys(data[0]);

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col} sx={{ fontWeight: "bold" }}>
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>
                            {columns.map((col) => (
                                <TableCell key={col}>{row[col]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
