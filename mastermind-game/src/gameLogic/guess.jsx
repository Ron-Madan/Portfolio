export default class Guess {
  constructor(guessSequence) {
    this.sequence = guessSequence;  // sequence should be an array of 5 colors
  }

  compare(solution) {
    let correctColors = 0;
    let correctPosition = 0;
  
    // First, check for correct positions
    this.sequence.forEach((color, i) => {
      if (color === solution[i]) {
        correctPosition++;
      }
    });
  
    // Now, check for correct colors in wrong positions
    this.sequence.forEach((color, i) => {
      if (color !== solution[i] && solution.includes(color)) {
        correctColors++;
      }
    });
  
    return [correctPosition, correctColors];  // Return feedback
  }
}