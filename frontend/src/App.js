import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Drivers from './components/Drivers';
import DriverDetails from './components/DriverDetails';
import Constructors from './components/Constructors';
import ConstructorDetails from './components/ConstructorDetails';
import Circuits from './components/Circuits';
import SeasonDetails from './components/SeasonDetails';
import RaceDetails from './components/RaceDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/:driverId" element={<DriverDetails />} />
        <Route path="/constructors" element={<Constructors />} />
        <Route path="/constructors/:constructorId" element={<ConstructorDetails />} />
        <Route path="/circuits" element={<Circuits />} />
        <Route path="/seasons/:year" element={<SeasonDetails />} />
        <Route path="/races/:raceId" element={<RaceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;