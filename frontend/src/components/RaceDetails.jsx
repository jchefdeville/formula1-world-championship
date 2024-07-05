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
    const [constructors, setConstructors] = useState(null);
    const [constructorResults, setConstructorResults] = useState(null);
    const [driverScores, setDriverScores] = useState(null);
    const [constructorScores, setConstructorScores] = useState(null);
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
            setDriverScores(data.driverScores);
            setConstructorScores(data.constructorScores);
            setStatuses(data.statuses);
        }

        fetchData();
    }, [raceId]);

    if (!race || !results || !drivers || !statuses || !constructors || !constructorResults || !driverScores || !constructorScores) {
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

            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <ResultsList results={results} drivers={drivers} statuses={statuses} constructors={constructors} />

                    <ConstructorResultsList constructorResults={constructorResults} constructors={constructors} />
                </div>
                <div style={{ flex: 1 }}>
                    <DriverScoresList driverScores={driverScores} drivers={drivers} />

                    <ConstructorScoresList constructorScores={constructorScores} constructors={constructors} />
                </div>
            </div>


        </div>
    );
}

function ResultsList({ results, drivers, statuses, constructors }) {
    return (
        <div>
            <h3>Driver Results</h3>
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
        </div>
    )
}

function ConstructorResultsList({ constructorResults, constructors }) {
    return (
        <div>
            <h3>Constructor Results</h3>
            <ul>
                {constructorResults.map((constructorResult, index) => {
                    const constructor = constructors.find(constructor => constructor.constructorId === constructorResult.constructorId);
                    return (
                        <li key={index}>
                            {constructor.name} - {constructorResult.points} {constructorResult.points > 1 ? 'points' : 'point'}
                            <span> - {constructorResult.status}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function DriverScoresList({ driverScores, drivers }) {
    return (
        <div>
            <h3>Driver Scores</h3>
            <ul>
                {driverScores.map((driverScore, index) => {
                    const driver = drivers.find(driver => driver.driverId === driverScore.driverId);
                    return (
                        <li key={index}>
                            {driverScore.position} - {driverScore.driverId} <a href={`/drivers/${driver?.driverId}`}>{driver?.forename} {driver?.surname}</a>
                            - {driverScore.points} {driverScore.points > 1 ? 'points' : 'point'}
                            - {driverScore.wins} {driverScore.wins > 1 ? 'wins' : 'win'}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function ConstructorScoresList({ constructorScores, constructors }) {
    console.log(constructors);
    console.log(constructorScores);

    return (
        <div>
            <h3>Constructor Scores</h3>
            <ul>
                {constructorScores.map((constructorScore, index) => {
                    const constructor = constructors.find(constructor => constructor.constructorId === constructorScore.constructorId);
                    return (
                        <li key={index}>
                            {constructorScore.position} - {constructor?.name}
                            - {constructorScore.points} {constructorScore.points > 1 ? 'points' : 'point'}
                            - {constructorScore.wins} {constructorScore.wins > 1 ? 'wins' : 'win'}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default RaceDetails;
