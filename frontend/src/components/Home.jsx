import React from 'react';
import BurgerMenu from './BurgerMenu';

const Home = () => {
    return (
        <div>
            <BurgerMenu />
            <div>
                <h1>Welcome to the Formula 1 World Championship!</h1>
                <p>Explore the exciting world of Formula 1 racing, with access to information about drivers, seasons, circuits, and more.</p>
                
                <div>
                    <h2>Featured Circuit: Monaco Grand Prix</h2>
                    <img src="/images/monaco-grand-prix.jpg" alt="Monaco Grand Prix" />
                    <p>The Monaco Grand Prix is one of the most prestigious races in Formula 1, held on the streets of Monte Carlo.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;