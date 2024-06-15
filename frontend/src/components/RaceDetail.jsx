import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

function RaceDetail() {

    const { raceId } = useParams();
 
    return (
        <div>
            <BurgerMenu />
            <h1>RACE DETAIL</h1>
            <p>Race ID: {raceId}</p>
        </div>
  );
}

export default RaceDetail;
