import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Drivers from './components/Drivers';
import Constructors from './components/Constructors';
import Circuits from './components/Circuits';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/constructors" element={<Constructors />} />
        <Route path="/circuits" element={<Circuits />} />
      </Routes>
    </Router>
  );
}

export default App;