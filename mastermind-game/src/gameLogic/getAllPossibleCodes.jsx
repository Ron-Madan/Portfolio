export const getAllPossibleCodes = () => {
    const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
    const permutations = [];
  
    // Generate all permutations of 5 colors from the 8 available colors
    const generateCombinations = (arr, combo = []) => {
      if (combo.length === 5) {
        permutations.push(combo);
        return;
      }
  
      for (let i = 0; i < arr.length; i++) {
        if (!combo.includes(arr[i])) {  // Ensures no duplicates
          generateCombinations(arr, [...combo, arr[i]]);
        }
      }
    };
  
    generateCombinations(COLORS);
    return permutations;
  };  