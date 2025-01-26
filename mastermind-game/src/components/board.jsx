import React from 'react';

const Board = ({ board, feedback, onCellClick, currentRow }) => {
  return (
    <div className="board" style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      {board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          data-row={rowIndex}
          className="row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: rowIndex === currentRow ? '#f0f2f5' : 'transparent',
            borderRadius: '8px',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                data-row={rowIndex}
                data-col={colIndex}
                className="cell"
                style={{
                  backgroundColor: color || '#e2e8f0',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: rowIndex === currentRow ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  border: color ? 'none' : '2px dashed #cbd5e0',
                  boxSizing: 'border-box',
                }}
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
          
          <div className="feedback-circles" style={{ 
            marginLeft: '1.5rem',
            display: 'flex',
            gap: '0.25rem',
            flexWrap: 'wrap',
            width: '60px'
          }}>
            {renderFeedbackCircles(feedback && feedback[rowIndex])}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderFeedbackCircles = (feedback) => {
  const circleStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    margin: '2px',
    transition: 'all 0.2s ease',
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e0',
    boxSizing: 'border-box',
  };

  const circles = [];

  if (!feedback) {
    // Default empty circles
    for (let i = 0; i < 5; i++) {
      circles.push(
        <div 
          key={`empty-${i}`} 
          style={circleStyle}
        />
      );
    }
  } else {
    const [correctPosition, correctColor] = feedback;

    // Correct position circles (black)
    for (let i = 0; i < correctPosition; i++) {
      circles.push(
        <div 
          key={`black-${i}`} 
          style={{
            ...circleStyle,
            backgroundColor: '#000000',
            border: '1px solid #000000',
          }}
        />
      );
    }

    // Correct color circles (white with black border)
    for (let i = 0; i < correctColor; i++) {
      circles.push(
        <div 
          key={`white-${i}`} 
          style={{
            ...circleStyle,
            backgroundColor: '#ffffff',
            border: '1px solid #000000',
          }}
        />
      );
    }

    // Empty circles for remaining spots
    const remaining = 5 - (correctPosition + correctColor);
    for (let i = 0; i < remaining; i++) {
      circles.push(
        <div 
          key={`empty-${i}`} 
          style={circleStyle}
        />
      );
    }
  }

  return circles;
};

export default Board;
