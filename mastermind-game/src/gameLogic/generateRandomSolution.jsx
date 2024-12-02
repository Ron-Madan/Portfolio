export const generateRandomSolution = () => {
    const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
    const solution = [];
  
    while (solution.length < 5) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      if (!solution.includes(randomColor)) {  // Ensure no duplicates
        solution.push(randomColor);
      }
    }
  
    return solution;
  };  