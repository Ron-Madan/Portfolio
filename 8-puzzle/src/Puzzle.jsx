import React, { useState } from "react";
import { aStar, manhattanDistance } from "./Solver";

const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// Helper to check if puzzle is solvable
const isSolvable = (puzzle) => {
  let inversions = 0;
  for (let i = 0; i < puzzle.length - 1; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] !== 0 && puzzle[j] !== 0 && puzzle[i] > puzzle[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

// Generate random solvable puzzle
const generateRandomPuzzle = () => {
  let puzzle;
  do {
    puzzle = [...Array(9).keys()]; // [0,1,2,3,4,5,6,7,8]
    // Fisher-Yates shuffle
    for (let i = puzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
    }
  } while (!isSolvable(puzzle));
  return puzzle;
};

const Puzzle = () => {
  const [puzzle, setPuzzle] = useState(generateRandomPuzzle());
  const [solving, setSolving] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Add click handler for tiles
  const handleTileClick = (idx) => {
    if (solving) return;
    
    const emptyIdx = puzzle.indexOf(0);
    // Check if clicked tile is adjacent to empty space
    const isAdjacent = (
      (Math.abs(idx - emptyIdx) === 1 && Math.floor(idx/3) === Math.floor(emptyIdx/3)) || // Same row
      (Math.abs(idx - emptyIdx) === 3) // Same column
    );

    if (isAdjacent) {
      const newPuzzle = [...puzzle];
      [newPuzzle[idx], newPuzzle[emptyIdx]] = [newPuzzle[emptyIdx], newPuzzle[idx]];
      setPuzzle(newPuzzle);
    }
  };

  // Update solvePuzzle to handle null solution
  const solvePuzzle = () => {
    setSolving(true);
    const solution = aStar(puzzle, goalState);
    if (solution) {
      animateSolution(solution);
    } else {
      alert("No solution exists for this puzzle configuration");
      setSolving(false);
    }
  };

  // Animate each move in the solution path
  const animateSolution = (solution) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < solution.length) {
        setPuzzle(solution[index]);
        index++;
      } else {
        clearInterval(interval);
        setSolving(false);
      }
    }, 1000); // 1 second per move
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-8,\s]/g, ''); // Only allow 0-8 and commas
    setInputValue(value);
  };

  const handleInputSubmit = () => {
    const numbers = inputValue.split(',').map(n => parseInt(n.trim()));
    if (numbers.length !== 9 || 
        !numbers.every(n => n >= 0 && n <= 8) || 
        new Set(numbers).size !== 9) {
      alert('Please enter valid numbers (0-8) separated by commas');
      return;
    }
    if (!isSolvable(numbers)) {
      alert('This puzzle configuration is not solvable');
      return;
    }
    setPuzzle(numbers);
    setInputMode(false);
    setInputValue('');
  };

  const renderTile = (value, idx) => {
    return (
      <div
        key={idx}
        className={`tile ${value === 0 ? "empty" : ""}`}
        onClick={() => handleTileClick(idx)}
        style={{
          width: '100px',
          height: '100px',
          border: '2px solid #333',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          backgroundColor: value === 0 ? '#f0f0f0' : '#ffffff',
          cursor: value !== 0 ? 'pointer' : 'default',
          transform: `translate(${(idx % 3) * 102}px, ${Math.floor(idx / 3) * 102}px)`,
          transition: 'transform 0.3s ease',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          userSelect: 'none'
        }}
      >
        {value !== 0 ? value : ""}
      </div>
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {inputMode ? (
        <div style={{ 
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter numbers 0-8 separated by commas"
            style={{
              padding: '8px',
              width: '300px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleInputSubmit}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
            <button 
              onClick={() => setInputMode(false)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div style={{ 
        position: 'relative',
        width: '306px',
        height: '306px',
        backgroundColor: '#f8f8f8',
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '8px',
        margin: '0 auto'
      }}>
        {puzzle.map((value, idx) => renderTile(value, idx))}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px',
        marginTop: '20px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={solvePuzzle} 
          disabled={solving}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: solving ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: solving ? 'not-allowed' : 'pointer'
          }}
        >
          {solving ? "Solving..." : "Solve"}
        </button>
        <button 
          onClick={() => setPuzzle(generateRandomPuzzle())} 
          disabled={solving}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: solving ? '#cccccc' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: solving ? 'not-allowed' : 'pointer'
          }}
        >
          Random
        </button>
        <button 
          onClick={() => setInputMode(true)} 
          disabled={solving}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: solving ? '#cccccc' : '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: solving ? 'not-allowed' : 'pointer'
          }}
        >
          Custom
        </button>
      </div>
    </div>
  );
};

export default Puzzle;
