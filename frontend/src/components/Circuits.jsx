import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BurgerMenu from './BurgerMenu';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
          },
        },
      },
    },
  },
});

function Circuits({ data }) {
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
          rows={data}
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
