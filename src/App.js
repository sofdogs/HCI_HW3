import './App.css';
import Login from './login-page';
import HomePage from './monitor-screen'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path = "/monitor-screen" element = {<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
