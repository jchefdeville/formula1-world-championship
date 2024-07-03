import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/burger-menu.css';

function BurgerMenu() {

    return (
        <div className="burger-menu">
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/drivers">Drivers</Link></li>
                    <li><Link to="/constructors">Constructors</Link></li>
                    <li><Link to="/circuits">Circuits</Link></li>
                    <li><Link to="/seasons/2023">2023 Season</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default BurgerMenu;