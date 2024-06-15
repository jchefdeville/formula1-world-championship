import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { fetchCircuits } from '../api.ts';
import { theme } from '../styles/theme-grid';
import BurgerMenu from './BurgerMenu';

function Circuits() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const circuitsData = await fetchCircuits();
        setData(circuitsData);
    }

    fetchData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'lat', headerName: 'Latitude', flex: 1 },
    { field: 'lng', headerName: 'Longitude', flex: 1 },
    { field: 'alt', headerName: 'Altitude', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1, renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>
      )
    },
  ];
 

  return (
    <ThemeProvider theme={theme}>
      <BurgerMenu />
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.circuitId}
          disableSelectionOnClick
          autoHeight
        />
      </Box>
    </ThemeProvider>
  );
}

export default Circuits;
