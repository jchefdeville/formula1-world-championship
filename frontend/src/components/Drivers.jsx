import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { fetchDrivers } from '../api.ts';
import BurgerMenu from './BurgerMenu';
import { theme } from '../styles/theme-grid';
import { useNavigate } from 'react-router-dom';

function Drivers() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const driversData = await fetchDrivers();
        setData(driversData);
    }

    fetchData();
  }, []);

  const handleDetailClick = (driverId) => {
    navigate(`/drivers/${driverId}`);
  };

  const columns = [
    { 
      field: 'driverId', headerName: '', flex: 0.1, renderCell: (params) => (
      <IconButton onClick={() => handleDetailClick(params.row.driverId)}>
        <Visibility />
      </IconButton>
      ), 
    },
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
