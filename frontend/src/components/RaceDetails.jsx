import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import BurgerMenu from './BurgerMenu';
import { fetchRaceDetails } from '../api.ts';

function RaceDetails() {

    const { raceId } = useParams();
    const navigate = useNavigate();

    const [race, setRace] = useState(null);
    const [results, setResults] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const [statuses, setStatuses] = useState(null);

    const changeRaceId = (newRaceId) => {
        navigate(`/races/${newRaceId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRaceDetails(raceId);
            setRace(data.race);
            setResults(data.results);
            setDrivers(data.drivers);
            setStatuses(data.statuses);
        }

        fetchData();
    }, [raceId]);

    if (!race || !results || !drivers || !statuses) {
        return <div>Loading</div>
    }
 
    return (
        <div>
            <BurgerMenu />

            <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => changeRaceId(+raceId - 1)}>
                Previous Race
            </Button>
            <Button variant="contained" color="secondary" onClick={() => changeRaceId(+raceId + 1)}>
                Next Race
            </Button>

            <h2>{race.year} - Round {race.round} - {race.name}</h2>
            
            <ul>
            {results.map((result, index) => {
                const driver = drivers.find(driver => driver.driverId === result.driverId);
                const status = statuses.find(status => status.statusId === result.statusId);
                return (
                    <li key={index}>
                        {result.positionText} 
                        - <a href={`/drivers/${driver.driverId}`}>{driver.forename} {driver.surname}</a>
                        - {result.points} points
                        {result.statusId !== 1 ? (
                            <span> - {status.status}</span>
                        ) : (
                            <span> - time = {result.time}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
  );
}

export default RaceDetails;
