import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchDrivers } from '../api';
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

function Drivers() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const driversData = await fetchDrivers();
        setData(driversData);
    }

    fetchData();
  }, []);

  const columns = [
    { field: 'driverRef', headerName: 'Ref', flex: 1 },
    { field: 'number', headerName: 'Number', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'forename', headerName: 'Forename', flex: 1 },
    { field: 'surname', headerName: 'Surname', flex: 1 },
    { field: 'dob', headerName: 'DOB', flex: 1 },
    { field: 'nationality', headerName: 'Nationality', flex: 1 },
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
                getRowId={(row) => row.driverId}
                disableSelectionOnClick
                autoHeight
            />
        </Box>
    </ThemeProvider>
);
}

export default Drivers;
