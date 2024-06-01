import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    {
      field: 'raceId', headerName: '', flex: 0.1, renderCell: (params) => (
        params && params.length > 0 ? (
          <IconButton onClick={() => handleDetailClick(params.row.raceId)}>
            <VisibilityIcon />
          </IconButton>
        ) : (
          <div>Loading...</div>
        )
      ),
    },
    { field: 'round', headerName: 'Round', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'time', headerName: 'time', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1, renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>
      )
    },
  ];

  const handleDetailClick = (raceId) => {
    console.log(raceId);
  };

  return (
    <ThemeProvider theme={theme}>
      <BurgerMenu />
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.raceId}
          disableSelectionOnClick
          autoHeight
        />
      </Box>
    </ThemeProvider>
  );
}

export default Races;
