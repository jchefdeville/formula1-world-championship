import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Circuits({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Latitude</TableCell>
                        <TableCell>Longitude</TableCell>
                        <TableCell>Altitude</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((circuit) => (
                        <TableRow key={circuit.circuitId}>
                            <TableCell>{circuit.name}</TableCell>
                            <TableCell>{circuit.location}</TableCell>
                            <TableCell>{circuit.country}</TableCell>
                            <TableCell>{circuit.lat}</TableCell>
                            <TableCell>{circuit.lng}</TableCell>
                            <TableCell>{circuit.alt}</TableCell>
                            <TableCell>{circuit.url}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Circuits;