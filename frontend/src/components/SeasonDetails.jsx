import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { fetchRaces } from '../api.ts';
import BurgerMenu from './BurgerMenu';
import { useNavigate } from 'react-router-dom';
import Races from './Races.jsx';

function SeasonDetails() {
 
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchRaces();
        setData(data);
    }

    fetchData();
  }, []);

  return (
      <Box sx={{ width: '100%' }}>
        <div>SEASONS 2023</div>
        <Races />
      </Box>
  );
}

export default SeasonDetails;
