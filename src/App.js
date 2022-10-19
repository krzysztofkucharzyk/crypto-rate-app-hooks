import React from 'react';
import bitcoin from './Bitcoin.svg';
import './App.css';
import Crypto from './Crypto';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={bitcoin} className="App-logo" alt="logo" />
        <h1>Crypto rate App on hooks</h1>
      </header>
      <Crypto />
    </div>
  );
}

export default App;
