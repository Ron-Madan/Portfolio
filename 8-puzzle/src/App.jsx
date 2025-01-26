import React from 'react';
import Puzzle from './Puzzle';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',  // Full viewport width
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <h1>8-Puzzle Solver</h1>
      <Puzzle />
    </div>
  );
}

export default App;
