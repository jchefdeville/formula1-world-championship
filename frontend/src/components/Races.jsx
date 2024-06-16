

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { fetchRaces } from '../api.ts';
import BurgerMenu from './BurgerMenu';
import { useNavigate } from 'react-router-dom';

function Races() {
 
  const navigate = useNavigate();
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
        <IconButton onClick={() => handleDetailClick(params.row.raceId)}>
          <Visibility />
        </IconButton>
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
    navigate(`/races/${raceId}`);
  };

  return (
      <Box sx={{ width: '100%' }}>
        <BurgerMenu />
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
  );
}

export default Races;
