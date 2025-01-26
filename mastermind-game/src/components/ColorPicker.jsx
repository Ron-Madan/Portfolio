import React from 'react';

const ColorPicker = ({ selectedColor, onColorSelect }) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', null];

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)} // Update the selected color
        />
      ))}
    </div>
  );
};

export default ColorPicker;
