import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { fetchConstructors } from '../api.ts';
import BurgerMenu from './BurgerMenu';
import { theme } from '../styles/theme-grid';
import { useNavigate } from 'react-router-dom';

function Constructors() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const constructorsData = await fetchConstructors();
        setData(constructorsData);
    }

    fetchData();
  }, []);

  const handleDetailClick = (constructorId) => {
    navigate(`/constructors/${constructorId}`);
  };

  const columns = [
    { 
      field: 'constructorId', headerName: '', flex: 0.1, renderCell: (params) => (
      <IconButton onClick={() => handleDetailClick(params.row.constructorId)}>
        <Visibility />
      </IconButton>
      ), 
    },
    { field: 'constructorRef', headerName: 'Ref', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
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
          getRowId={(row) => row.constructorId}
          disableSelectionOnClick
          autoHeight
        />
      </Box>
    </ThemeProvider>
  );
}

export default Constructors;
