import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Circuits from './components/Circuits';
import Constructors from './components/Constructors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/circuits" element={<Circuits />} />
        <Route path="/constructors" element={<Constructors />} />
      </Routes>
    </Router>
  );
}

export default App;