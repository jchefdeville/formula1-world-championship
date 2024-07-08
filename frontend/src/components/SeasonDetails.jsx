import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import BurgerMenu from './BurgerMenu';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Races from './Races.jsx';
import { fetchSeasonDetails } from '../api.ts';

function SeasonDetails() {
 
  const { year } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [races, setRaces] = useState(null);
  const [circuits, setCircuits] = useState(null);
  
  
  useEffect(() => {
    const fetchData = async () => {
        console.log("fetching data for year", year);
        const data = await fetchSeasonDetails(year);
        setResults(data.results);
        setDrivers(data.drivers);
        setRaces(data.races);
        setCircuits(data.circuits);
    }

    fetchData();
  }, [year]);

  const changeSeasonYear = (year) => {
      navigate(`/seasons/${year}`);
  };

  return (
    <Box>
      <BurgerMenu />

      <div>{year} SEASON</div>

      <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => changeSeasonYear(+year - 1)}>
        Previous Season
      </Button>
      {year != 2023 && (
        <Button variant="contained" color="secondary" onClick={() => changeSeasonYear(+year + 1)}>
          Next Season
        </Button>
      )}

      {(!results || !drivers || !races || !circuits) ? (
        <div>Loading</div>
      ) : (
        <SeasonDetailsTable drivers={drivers} races={races} results={results} circuits={circuits} />
      )}

      <Races year={year} />
    </Box>
  );
}

// Composant TableHeader
const TableHeader = ({ races, circuits }) => (
  <thead>
    <tr>
      <th>Driver</th>
      {races.map((race) => {
        const circuit = circuits.find((circuit) => circuit.circuitId === race.circuitId);
        return <th key={race.raceId}>{circuit.name}</th>;
      })}
    </tr>
  </thead>
);

// Composant TableRow
const TableRow = ({ driver, races, results }) => (
  <tr>
    <td>{driver.forename} {driver.surname}</td>
    {races.map((race) => {
      const driverResult = results.find((res) => res.driverId === driver.driverId && res.raceId === race.raceId);
      return (
        <td key={race.raceId} style={{ textAlign: 'center' }}>
          {driverResult ? driverResult.points : '-'}
        </td>
      );
    })}
  </tr>
);

// Utilisation dans SeasonDetails
const SeasonDetailsTable = ({ drivers, races, results, circuits }) => (
  <table>
    <TableHeader races={races} circuits={circuits} />
    <tbody>
      {drivers.map((driver, index) => (
        <TableRow key={index} driver={driver} races={races} results={results} />
      ))}
    </tbody>
  </table>
);

export default SeasonDetails;
