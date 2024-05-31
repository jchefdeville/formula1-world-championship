import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import { fetchCircuits, fetchConstructors } from '../api';

function BurgerMenu({ onCircuitsClick, onConstructorsClick }) {
    const handleCircuitsClick = async () => {
        try {
            const circuitsData = await fetchCircuits();
            onCircuitsClick(circuitsData); // Passer les données des circuits au parent
        } catch (error) {
            console.error('Erreur while retrieving circuits:', error);
        }
    };

    const handleConstructorsClick = async () => {
        try {
            const constructorsData = await fetchConstructors();
            onConstructorsClick(constructorsData); // Passer les données des constructeurs au parent
        } catch (error) {
            console.error('Erreur while retrieving constructors:', error);
        }
    };

    return (
        <div className="burger-menu">
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
            <nav className="nav">
                <ul>
                    <li><Link to="/circuits" onClick={handleCircuitsClick}>Circuits</Link></li>
                    <li><Link to="/constructors" onClick={handleConstructorsClick}>Constructors</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default BurgerMenu;