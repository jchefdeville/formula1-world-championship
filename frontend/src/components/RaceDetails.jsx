import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import BurgerMenu from './BurgerMenu';
import { fetchRaceDetails } from '../api.ts';
import { DataGrid } from '@mui/x-data-grid';

function RaceDetails() {

    const { raceId } = useParams();
    const navigate = useNavigate();

    const [race, setRace] = useState(null);
    const [results, setResults] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    const [constructorResults, setConstructorResults] = useState(null);
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
            setConstructors(data.constructors);
            setConstructorResults(data.constructorResults);
            setStatuses(data.statuses);
        }

        fetchData();
    }, [raceId]);

    if (!race || !results || !drivers || !statuses || !constructors || !constructorResults) {
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
                    const constructor = constructors.find(constructor => constructor.constructorId === result.constructorId);
                    return (
                        <li key={index}>
                            {result.positionText}
                            - <a href={`/drivers/${driver.driverId}`}>{driver.forename} {driver.surname}</a>
                            - {constructor.name}
                            - {result.points} {result.points > 1 ? 'points' : 'point'}
                            {result.statusId !== 1 ? (
                                <span> - {status.status}</span>
                            ) : (
                                <span> - time = {result.time}</span>
                            )}
                        </li>
                    );
                })}
            </ul>

            <h3>Constructor Results</h3>
            <ul>
                {constructorResults.map((constructorResult, index) => {
                    const constructor = constructors.find(constructor => constructor.constructorId === constructorResult.constructorId);
                    return ( 
                        <li key={index}>
                            {constructor.name} 
                            - {constructorResult.points} {constructorResult.points > 1 ? 'points' : 'point'}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default RaceDetails;
