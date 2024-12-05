import React, { useState } from 'react';
import Board from './board';
import ColorPicker from './ColorPicker';
import { generateRandomSolution } from '../gameLogic/generateRandomSolution'; 
import Guess from '../gameLogic/guess';
import { getNextGuess } from '../gameLogic/Minimax';
import { getAllPossibleCodes } from '../gameLogic/getAllPossibleCodes'; 

const Game = () => {
  const [board, setBoard] = useState(Array(10).fill(Array(5).fill(null))); // 10 rows, 5 cells per row
  const [currentRow, setCurrentRow] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);  // To track which cell is being edited
  const [history, setHistory] = useState([]);
  const [solution, setSolution] = useState(generateRandomSolution());  // Generate the random solution
  const [feedback, setFeedback] = useState([]); // Store feedback for each row
  const [allPossibleCodes, setAllPossibleCodes] = useState(getAllPossibleCodes()); // Get all possible codes
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [colorPickerPosition, setColorPickerPosition] = useState({ top: 0, left: 0 }); // Store color picker position
  const [errorMessage, setErrorMessage] = useState(null); // Store error message for duplicates
  const [isAIGuessing, setIsAIGuessing] = useState(false); // Track if AI guess is being processed
  const [won, setWon] = useState(false); // Track if the user has won

  const cellSize = 40;
  const gap = 10;

  const handleCellClick = (rowIndex, colIndex) => {
    if (rowIndex === currentRow && !gameOver) {
      setSelectedCell({ rowIndex, colIndex }); // Track the cell being edited
  
      // Dynamically adjust positions based on screen width
      let baseLeftPosition;
      const screenWidth = window.innerWidth;
      if (screenWidth <= 300) {
        baseLeftPosition = screenWidth / 6;
      } else if (screenWidth <= 480) {
        baseLeftPosition = screenWidth / 5;
      } else if (screenWidth <= 768) {
        baseLeftPosition = screenWidth / 4.5;
      } else {
        // Large screens (desktop)
        baseLeftPosition = screenWidth / 3;
      }
  
      // Calculate the position of the color picker
      const topPosition = (10 - rowIndex) * (cellSize + gap);
      const leftPosition = baseLeftPosition + colIndex * (cellSize + gap);
  
      setColorPickerPosition({
        top: topPosition,
        left: leftPosition,
      });
    }
  };

  const handleColorSelect = (color) => {
    if (selectedCell) {
      const newBoard = [...board];
      newBoard[selectedCell.rowIndex] = [...newBoard[selectedCell.rowIndex]];
      newBoard[selectedCell.rowIndex][selectedCell.colIndex] = color;
      setBoard(newBoard);
      setSelectedColor(color);  // Set the selected color for future use
      setSelectedCell(null);  // Clear the selected cell after choosing a color
    }
  };

  const handleSubmitGuess = () => {
    // Check for duplicate colors and empty sequence
    const nonNullColors = board[currentRow].filter((color) => color !== null);
    if (nonNullColors.length === 0) {
      setErrorMessage("You cannot submit an empty guess.");
      return;
    }
    if (new Set(nonNullColors).size !== nonNullColors.length) {
      setErrorMessage("You cannot submit a guess with duplicate colors. Please choose unique colors.");
      return;
    }

    setErrorMessage(null); // Clear error message if valid

    const guess = new Guess(board[currentRow]);
    const guessFeedback = guess.compare(solution);  // Pass the sequence of the solution
    setFeedback([...feedback, guessFeedback]);  // Store the feedback for the current guess
    setHistory([...history, [guess, guessFeedback]]);

    // Check if all feedback is correct (5 correct positions)
    if (guessFeedback[0] === 5) {
      setWon(true); // User has won, show the message
      setGameOver(true);  // End the game if all positions are correct
    } else {
      setCurrentRow(currentRow + 1);
    }
  };

  const handleAIHint = () => {
    setIsAIGuessing(true);  // Set AI guess processing state to true
    const nextGuess = getNextGuess(history, allPossibleCodes);  // Pass possible codes to AI
    const newBoard = [...board];
    newBoard[currentRow] = nextGuess;
    setBoard(newBoard);

    setTimeout(() => {
      setIsAIGuessing(false); // Reset the AI guessing state after a short delay
    }, 500);  // Simulate a delay for rendering the AI guess (e.g., 500ms)
  };

  const handleNewGame = () => {
    setBoard(Array(10).fill(Array(5).fill(null)));  // Reset the board
    setCurrentRow(0);  // Reset the current row
    setSelectedCell(null);  // Clear the selected cell
    setFeedback([]);  // Clear previous feedback
    setHistory([]);  // Clear history
    setGameOver(false);  // Reset the game over state
    setWon(false);  // Reset the win state
    setColorPickerPosition({ top: 0, left: 0 });  // Reset color picker position
    setSolution(generateRandomSolution());  // Generate a new solution
    setAllPossibleCodes(getAllPossibleCodes());  // Generate all possible codes
  };

  const disableButtons = gameOver || currentRow === 10 || isAIGuessing; // Disable buttons if game is over, last row reached, or AI guess is being processed

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px', position: 'relative', left: '10px' }}>Mastermind Game</h1>

      {/* Display congratulatory message if the user wins */}
      {won && <div style={{ color: 'green', fontSize: '20px' }}>Congratulations! You've won!</div>}

      <Board 
        board={board} 
        feedback={feedback} 
        onCellClick={handleCellClick} 
        currentRow={currentRow} // Pass the currentRow to Board to highlight it
      />

      {/* Only show color picker when a cell is selected */}
      {selectedCell && !gameOver && (
        <div
          className="color-picker-container"
          style={{
            position: 'absolute',
            top: `${colorPickerPosition.top}px`,
            left: `${colorPickerPosition.left}px`,
            zIndex: 100,
          }}
        >
          <ColorPicker selectedColor={selectedColor} onColorSelect={handleColorSelect} />
        </div>
      )}

      {/* Submit button for the current guess */}
      <button onClick={handleSubmitGuess} disabled={disableButtons}>Submit Guess</button>

      {/* AI Hint button */}
      <button onClick={handleAIHint} disabled={disableButtons}>Get AI Hint</button>

      {/* New Game button */}
      <button onClick={handleNewGame}>New Game</button>

      {/* Error message for duplicate colors */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Game;
