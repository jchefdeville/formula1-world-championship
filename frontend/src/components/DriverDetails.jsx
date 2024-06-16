import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDriverDetails } from '../api.ts';
import BurgerMenu from './BurgerMenu.jsx';

function DriverDetails() {
    const { driverId } = useParams();

    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDriverDetails(driverId);
            setDriver(data.driver);
        }

        fetchData();
    }, [driverId]);

    if (!driver) {
        return <div>Loading driver details...</div>;
    }

    return (
        <div>
            <BurgerMenu />
            <h2>Driver Details</h2>
            <p><strong>Name:</strong> {driver.forename} {driver.surname}</p>
            <p><strong>number:</strong> {driver.number}</p>
        </div>
    );
}

export default DriverDetails;