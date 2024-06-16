import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import { fetchRaceDetails } from '../api.ts';

function RaceDetails() {

    const { raceId } = useParams();

    const [race, setRace] = useState(null);
    const [results, setResults] = useState(null);
    const [drivers, setDrivers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRaceDetails(raceId);
            setRace(data.race);
            setResults(data.results);
            setDrivers(data.drivers);
        }

        fetchData();
    }, [raceId]);
 
    return (
        <div>
            <BurgerMenu />
            <h1>RACE DETAILS</h1>
            <p>Race ID: {raceId}</p>
            <p>{race ? `${race.name} ${race.year} - Round ${race.round}` : 'Race details not available'}</p>
            {results && Array.isArray(results) ? (
                <ul>
                {results.map((result, index) => {
                    const driver = drivers.find(driver => driver.driverId === result.driverId);
                    return (
                        <li key={index}>
                            {result.positionText} 
                            - <a href={`/drivers/${driver.driverId}`}>{driver.forename} {driver.surname}</a>
                            - {result.points} points
                            <p>time = {result.time && ` ${result.time}`}</p>
                        </li>
                    );
                })}
            </ul>
            ) : (
                <p>No results found</p>
            )}
        </div>
  );
}

export default RaceDetails;
