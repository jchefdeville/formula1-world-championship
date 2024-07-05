import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchConstructorDetails, fetchConstructors } from '../api.ts';
import BurgerMenu from './BurgerMenu.jsx';
import Button from '@mui/material/Button';

function ConstructorDetails() {

    const { constructorId } = useParams();
    const navigate = useNavigate();

    const [constructor, setConstructor] = useState(null);
    const [drivers, setDrivers] = useState(null);

    useEffect(() => {
        console.log('constructorId:', constructorId);
        const fetchData = async () => {
            const data = await fetchConstructorDetails(constructorId);
            setConstructor(data.constructor);
            setDrivers(data.drivers);
        }

        fetchData();
    }, [constructorId]);

    const changeConstructorId = (newConstructorId) => {
        navigate(`/constructors/${newConstructorId}`);
    };

    if (!constructor || !drivers) {
        return <div>Loading constructor details...</div>;
    }

    return (
        <div>
            <BurgerMenu />

            <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => changeConstructorId(+constructorId - 1)}>
                Previous Constructor
            </Button>
            <Button variant="contained" color="secondary" onClick={() => changeConstructorId(+constructorId + 1)}>
                Next Constructor
            </Button>

            <h2>Constructor Details</h2>
            <p><strong>Name:</strong> {constructor.name}</p>
            <p style={{whiteSpace: 'pre-wrap'}}><strong>Nationality:</strong> {constructor.nationality}</p>

            <h2>Drivers</h2>
            <ul>
                {drivers.map((driver) => (
                    <li key={driver.driverId}>
                        <a href={`/drivers/${driver.driverId}`}>{driver.forename} {driver.surname}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ConstructorDetails;
