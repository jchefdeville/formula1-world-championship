import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { fetchDriverDetails } from '../api.ts';
import BurgerMenu from './BurgerMenu.jsx';

function DriverDetails() {
    const { driverId } = useParams();
    const navigate = useNavigate();

    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDriverDetails(driverId);
            setDriver(data.driver);
        }

        fetchData();
    }, [driverId]);

    const changeDriverId = (newDriverId) => {
        navigate(`/drivers/${newDriverId}`);
    };

    if (!driver) {
        return <div>Loading driver details...</div>;
    }

    return (
        <div>
            <BurgerMenu />

            <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => changeDriverId(+driverId - 1)}>
                Previous Driver
            </Button>
            <Button variant="contained" color="secondary" onClick={() => changeDriverId(+driverId + 1)}>
                Next Driver
            </Button>

            <h2>Driver Details</h2>
            <p><strong>Name:</strong> {driver.forename} {driver.surname}</p>
            <p><strong>number:</strong> {driver.number}</p>
        </div>
    );
}

export default DriverDetails;