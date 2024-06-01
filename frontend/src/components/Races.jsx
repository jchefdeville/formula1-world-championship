import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchRaces } from '../api';
import BurgerMenu from './BurgerMenu';
import { theme } from '../styles/theme-grid';

function Races() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchRaces();
        setData(data);
    }

    fetchData();
  }, []);

  const columns = [
    { field: 'round', headerName: 'Round', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'time', headerName: 'time', flex: 1 },
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

export default Races;
