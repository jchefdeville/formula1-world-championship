import React from 'react';
import { Box } from '@mui/material';
import BurgerMenu from './BurgerMenu';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Races from './Races.jsx';

function SeasonDetails() {
 
  const { year } = useParams();
  const navigate = useNavigate();

  const changeSeasonYear = (year) => {
      navigate(`/seasons/${year}`);
  };

  return (
      <Box sx={{ width: '100%' }}>

        <BurgerMenu />

        <div>{year} SEASON</div>

        <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => changeSeasonYear(+year - 1)}>
          Previous Season
        </Button>
        <Button variant="contained" color="secondary" onClick={() => changeSeasonYear(+year + 1)}>
          Next Season
        </Button>

        <Races year={year} />
      </Box>
  );
}

export default SeasonDetails;
