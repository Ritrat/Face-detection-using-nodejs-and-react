import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgeDetection from './components/AgeDetection';
import ExpressionDetection from './components/ExpressionDetection'; 
import GenderDetection from './components/GenderDetection';
import Home from './components/Home';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/age-detection" element={<AgeDetection />} />
            <Route path="/expression-detection" element={<ExpressionDetection />} />
            <Route path="/gender-detection" element={<GenderDetection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;