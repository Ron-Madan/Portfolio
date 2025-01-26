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
  const [isThinking, setIsThinking] = useState(false);

  const cellSize = 40;
  const gap = 10;

  const handleCellClick = (rowIndex, colIndex) => {
    if (rowIndex === currentRow && !gameOver) {
      setSelectedCell({ rowIndex, colIndex });
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
      setWon(true);
      setGameOver(true);
    } else if (currentRow === 9) { // Check if this was the last row
      setGameOver(true); // End game if we've used all rows
    } else {
      setCurrentRow(currentRow + 1);
    }
  };

  const handleAIHint = async () => {
    setIsThinking(true);  // Start thinking state
    setIsAIGuessing(true);

    // Wrap the AI logic in a setTimeout to ensure UI updates first
    setTimeout(() => {
      const nextGuess = getNextGuess(history, allPossibleCodes);
      const newBoard = [...board];
      newBoard[currentRow] = nextGuess;
      setBoard(newBoard);
      
      setIsThinking(false);  // End thinking state
      setIsAIGuessing(false);
    }, 100);
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

  const disableButtons = gameOver || currentRow === 10 || isAIGuessing || isThinking;

  return (
    <div className="game-container" style={{ 
      padding: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f8f9fa',
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        zIndex: 5,
      }}>
        <h1 style={{ 
          color: '#2c3e50',
          fontSize: '2.5rem',
          fontWeight: '600',
          margin: 0,
        }}>
          Mastermind
        </h1>
      </header>

      {(won || (gameOver && !won)) && (
        <div style={{ 
          color: won ? '#27ae60' : '#e74c3c', // Green for win, red for loss
          fontSize: '1.5rem',
          fontWeight: '600',
          padding: '1.5rem',
          backgroundColor: won ? '#d4edda' : '#fde2e2', // Green bg for win, red bg for loss
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          maxWidth: '600px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          {won ? '🎉 Congratulations! You\'ve won! 🎉' : '😔 Game Over! Try again! 😔'}
        </div>
      )}

      <div style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '110px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '100%',
          justifyContent: 'center',
        }}>
          <Board 
            board={board} 
            feedback={feedback} 
            onCellClick={handleCellClick} 
            currentRow={currentRow}
          />

          {selectedCell && !gameOver && (
            <div
              className="color-picker-container"
              style={{
                position: 'absolute',
                left: '50%', // Center horizontally
                transform: 'translateX(-50%)', // Adjust for perfect centering
                top: `${(11 - selectedCell.rowIndex) * 48}px`, // Position it one row above current
                zIndex: 10, // Ensure it appears above the board
                backgroundColor: 'white', // Optional: add background
                padding: '8px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: add shadow
              }}
            >
              <ColorPicker selectedColor={selectedColor} onColorSelect={handleColorSelect} />
            </div>
          )}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '2rem'
      }}>
        <button 
          onClick={handleSubmitGuess} 
          disabled={disableButtons}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4834d4',
            color: 'white',
            cursor: disableButtons ? 'not-allowed' : 'pointer',
            opacity: disableButtons ? 0.7 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          Submit Guess
        </button>

        <button 
          onClick={handleAIHint} 
          disabled={disableButtons}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#00b894',
            color: 'white',
            cursor: disableButtons ? 'not-allowed' : 'pointer',
            opacity: disableButtons ? 0.7 : 1,
            transition: 'all 0.2s ease',
            minWidth: '140px',
          }}
        >
          {isThinking ? 'Thinking...' : 'Get AI Hint'}
        </button>

        <button 
          onClick={handleNewGame}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#e17055',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          New Game
        </button>
      </div>

      {errorMessage && (
        <div style={{ 
          color: '#e74c3c',
          backgroundColor: '#fde2e2',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          fontSize: '0.9rem'
        }}>
          ⚠️ {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Game;
