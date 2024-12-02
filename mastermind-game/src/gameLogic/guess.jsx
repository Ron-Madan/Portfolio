export default class Guess {
  constructor(guessSequence) {
    this.sequence = guessSequence;  // sequence should be an array of 5 colors
  }

  compare(solution) {
    let correctColors = 0;
    let correctPosition = 0;
    const usedIndices = new Set();  // Track used indices for correct colors

    // First, check for correct positions
    this.sequence.forEach((color, i) => {
      if (color === solution[i]) {
        correctPosition++;
        usedIndices.add(i);  // Mark this index as used
      }
    });

    // Now, check for correct colors in wrong positions
    this.sequence.forEach((color, i) => {
      if (usedIndices.has(i)) return;  // Skip if already used in correct position
      const indexInSolution = solution.indexOf(color);
      if (indexInSolution !== -1 && !usedIndices.has(indexInSolution)) {
        correctColors++;
        usedIndices.add(indexInSolution);
      }
    });

    return [correctPosition, correctColors];  // Return feedback
  }
}