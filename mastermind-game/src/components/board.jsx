import React from 'react';

const Board = ({ board, feedback, onCellClick, currentRow }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="row"
          style={{
            display: 'flex',
            alignItems: 'center',
            border: rowIndex === currentRow ? '2px solid #007bff' : 'none', // Highlight current row
            padding: rowIndex === currentRow ? '5px' : '0', // Optional: Add padding for the highlighted border
            marginBottom: '5px',
          }}
        >
          {/* Render the row of cells */}
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{
                backgroundColor: color || 'gray', // Display color if present, else gray
                width: '40px',
                height: '40px',
                margin: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => onCellClick(rowIndex, colIndex)} // Call handleCellClick when clicked
            />
          ))}
          {/* Render the feedback circles beside the row */}
          <div className="feedback-circles" style={{ marginLeft: '10px' }}>
            {renderFeedbackCircles(feedback && feedback[rowIndex])}
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to render feedback circles for a given guess
const renderFeedbackCircles = (feedback) => {
  const circles = [];

  if (!feedback) {
    // If no feedback, render 5 empty circles
    for (let i = 0; i < 5; i++) {
      circles.push(<div key={`empty-${i}`} className="circle wrong"></div>);
    }
  } else {
    const [correctPosition, correctColor] = feedback;
    console.log(feedback);

    // Add black circles for correct position
    for (let i = 0; i < correctPosition; i++) {
      circles.push(<div key={`black-${i}`} className="circle correctPosition"></div>);
    }

    // Add gray circles for correct color but wrong position
    for (let i = 0; i < correctColor; i++) {
      circles.push(<div key={`gray-${i}`} className="circle correctColor"></div>);
    }

    // Add empty circles (wrong) to fill up the remaining spots
    const remaining = 5 - (correctPosition + correctColor);
    for (let i = 0; i < remaining; i++) {
      circles.push(<div key={`empty-${i}`} className="circle wrong"></div>);
    }
  }

  return circles;
};

export default Board;
