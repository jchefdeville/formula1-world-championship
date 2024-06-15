import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

function RaceDetails() {

    const { raceId } = useParams();
 
    return (
        <div>
            <BurgerMenu />
            <h1>RACE DETAILS</h1>
            <p>Race ID: {raceId}</p>
        </div>
  );
}

export default RaceDetails;
