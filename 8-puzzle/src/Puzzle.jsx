import React, { useState } from "react";
import { aStar, manhattanDistance } from "./Solver";

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const PUZZLE_CONFIGS = {
  '8': {
    size: 3,
    goalState: [1, 2, 3, 4, 5, 6, 7, 8, 0],
    tileSize: 100,
    gridSize: 306
  },
  '15': {
    size: 4,
    goalState: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    tileSize: 75,
    gridSize: 306
  }
};

const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// Helper to check if puzzle is solvable
const isSolvable = (puzzle, size = 3) => {
  let inversions = 0;
  for (let i = 0; i < puzzle.length - 1; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] !== 0 && puzzle[j] !== 0 && puzzle[i] > puzzle[j]) {
        inversions++;
      }
    }
  }
  
  if (size % 2 === 1) {
    // For odd-sized grids (e.g., 3x3), the number of inversions must be even
    return inversions % 2 === 0;
  } else {
    // For even-sized grids (e.g., 4x4), the number of inversions plus the row of the blank tile (counted from bottom)
    // must be odd for the puzzle to be solvable
    const blankRow = Math.floor(puzzle.indexOf(0) / size);
    const rowFromBottom = size - blankRow;
    return (inversions + rowFromBottom) % 2 === 1;
  }
};

// Generate random solvable puzzle
const generateRandomPuzzle = (puzzleType) => {
  const size = PUZZLE_CONFIGS[puzzleType].size;
  let puzzle;
  do {
    puzzle = Array.from({length: size * size}, (_, i) => i); // Creates [0,1,2,...,8] for 3x3 or [0,1,2,...,15] for 4x4
    // Fisher-Yates shuffle
    for (let i = puzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
    }
  } while (!isSolvable(puzzle, size));
  return puzzle;
};

const Puzzle = () => {
  const [puzzleType, setPuzzleType] = useState('8');
  const [puzzle, setPuzzle] = useState(generateRandomPuzzle('8'));
  const [solving, setSolving] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [draggingTile, setDraggingTile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Add function to check if puzzle is solved
  const checkSolved = (currentPuzzle) => {
    const goalState = PUZZLE_CONFIGS[puzzleType].goalState;
    if (currentPuzzle.every((value, index) => value === goalState[index])) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Add click handler for tiles
  const handleTileClick = (idx) => {
    if (solving) return;
    
    const size = PUZZLE_CONFIGS[puzzleType].size;
    const emptyIdx = puzzle.indexOf(0);
    // Check if clicked tile is adjacent to empty space
    const isAdjacent = (
      (Math.abs(idx - emptyIdx) === 1 && Math.floor(idx/size) === Math.floor(emptyIdx/size)) || // Same row
      (Math.abs(idx - emptyIdx) === size) // Same column
    );

    if (isAdjacent) {
      const newPuzzle = [...puzzle];
      [newPuzzle[idx], newPuzzle[emptyIdx]] = [newPuzzle[emptyIdx], newPuzzle[idx]];
      setPuzzle(newPuzzle);
      checkSolved(newPuzzle);
    }
  };

  // Add drag handlers
  const handleDragStart = (e, idx) => {
    if (solving) return;
    
    const size = PUZZLE_CONFIGS[puzzleType].size;
    const emptyIdx = puzzle.indexOf(0);
    const isAdjacent = (
      (Math.abs(idx - emptyIdx) === 1 && Math.floor(idx/size) === Math.floor(emptyIdx/size)) || // Same row
      (Math.abs(idx - emptyIdx) === size) // Same column
    );

    if (isAdjacent) {
      setDraggingTile(idx);
      e.dataTransfer.effectAllowed = 'move';
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, idx) => {
    e.preventDefault();
    if (draggingTile === null || solving) return;

    const emptyIdx = puzzle.indexOf(0);
    if (idx === emptyIdx) {
      const newPuzzle = [...puzzle];
      [newPuzzle[draggingTile], newPuzzle[emptyIdx]] = [newPuzzle[emptyIdx], newPuzzle[draggingTile]];
      setPuzzle(newPuzzle);
      checkSolved(newPuzzle);
    }
    setDraggingTile(null);
  };

  // Update solvePuzzle to handle null solution
  const solvePuzzle = async () => {
    // Immediately update UI state
    setSolving(true);
    
    // Small delay to ensure UI updates are visible
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const solution = aStar(puzzle, PUZZLE_CONFIGS[puzzleType].goalState);
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
        checkSolved(solution[solution.length - 1]);
      }
    }, 1000); // 1 second per move
  };

  const handleInputChange = (e) => {
    // Update regex based on puzzle type
    const regex = puzzleType === '8' ? /[^0-8,\s]/g : /[^0-9,\s]|1[6-9]|[2-9]\d/g;
    const value = e.target.value.replace(regex, '');
    setInputValue(value);
  };

  const handleInputSubmit = () => {
    const size = PUZZLE_CONFIGS[puzzleType].size;
    const maxNum = size * size - 1;
    const numbers = inputValue.split(',').map(n => parseInt(n.trim()));
    
    if (numbers.length !== size * size || 
        !numbers.every(n => n >= 0 && n <= maxNum) || 
        new Set(numbers).size !== size * size) {
      alert(`Please enter valid numbers (0-${maxNum}) separated by commas`);
      return;
    }
    
    if (!isSolvable(numbers, size)) {
      alert('This puzzle configuration is not solvable');
      return;
    }
    setPuzzle(numbers);
    setInputMode(false);
    setInputValue('');
  };

  // Update button click handler
  const handlePuzzleTypeChange = () => {
    const newType = puzzleType === '8' ? '15' : '8';
    setPuzzleType(newType);
    setPuzzle(generateRandomPuzzle(newType)); // Generate new puzzle with correct size
  };

  // Update renderTile to use current config
  const renderTile = (value, idx) => {
    const config = PUZZLE_CONFIGS[puzzleType];
    const size = config.size;
    const tileSize = config.tileSize;
    const emptyIdx = puzzle.indexOf(0);
    const isAdjacent = (
      (Math.abs(idx - emptyIdx) === 1 && Math.floor(idx/size) === Math.floor(emptyIdx/size)) || 
      (Math.abs(idx - emptyIdx) === size)
    );

    return (
      <div
        key={idx}
        className={`tile ${value === 0 ? "empty" : ""}`}
        onClick={() => handleTileClick(idx)}
        draggable={value !== 0 && isAdjacent && !solving}
        onDragStart={(e) => handleDragStart(e, idx)}
        onDragOver={value === 0 ? handleDragOver : undefined}
        onDrop={value === 0 ? (e) => handleDrop(e, idx) : undefined}
        style={{
          width: `${tileSize}px`,
          height: `${tileSize}px`,
          border: `2px solid ${prefersDarkMode ? '#666' : '#333'}`,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: puzzleType === '15' ? '18px' : '24px',
          fontWeight: 'bold',
          backgroundColor: value === 0 
            ? (prefersDarkMode ? '#2a2a2a' : '#f0f0f0')
            : (prefersDarkMode ? '#333' : '#ffffff'),
          color: prefersDarkMode ? '#fff' : '#000',
          cursor: (value !== 0 && isAdjacent && !solving) ? 'grab' : 'default',
          transform: `translate(${(idx % size) * (tileSize + 2)}px, ${Math.floor(idx / size) * (tileSize + 2)}px)`,
          transition: 'transform 0.3s ease',
          borderRadius: '8px',
          boxShadow: prefersDarkMode 
            ? '0 2px 4px rgba(0,0,0,0.3)' 
            : '0 2px 4px rgba(0,0,0,0.1)',
          userSelect: 'none',
          opacity: draggingTile === idx ? '0.5' : '1',
          WebkitUserDrag: 'none',
          MozUserDrag: 'none',
          msUserDrag: 'none'
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
      <button 
        onClick={handlePuzzleTypeChange}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#9C27B0',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        Switch to {puzzleType === '8' ? '15' : '8'}-puzzle
      </button>

      {showSuccess && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '20px 40px',
          borderRadius: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 1000,
          animation: 'fadeIn 0.5s ease-in-out',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          Solved!
        </div>
      )}
      
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
            placeholder={`Enter numbers 0-${PUZZLE_CONFIGS[puzzleType].size * PUZZLE_CONFIGS[puzzleType].size - 1} separated by commas`}
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
        width: `${PUZZLE_CONFIGS[puzzleType].gridSize}px`,
        height: `${PUZZLE_CONFIGS[puzzleType].gridSize}px`,
        backgroundColor: prefersDarkMode ? '#1a1a1a' : '#f8f8f8',
        border: `2px solid ${prefersDarkMode ? '#666' : '#ccc'}`,
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

// Add this to your existing styles or in a separate CSS file
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -60%); }
    to { opacity: 1; transform: translate(-50%, -50%); }
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Puzzle;
