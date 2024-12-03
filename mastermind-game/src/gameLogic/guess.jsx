export default class Guess {
  constructor(guessSequence) {
    this.sequence = guessSequence;  // sequence should be an array of 5 colors
  }

  compare(solution) {
    let correctColors = 0;
    let correctPosition = 0;
    let incorrectColors = 0;
  
    // First, check for correct positions
    this.sequence.forEach((color, i) => {
      if (color === null) { return; }
      if (color === solution[i]) {
        correctPosition++;
      }
    });
  
    // Now, check for correct colors in wrong positions
    this.sequence.forEach((color, i) => {
      if (color === null) { return; }
      if (color !== solution[i] && solution.includes(color)) {
        correctColors++;
      }
    });

    // Confirm check logic is correct
    this.sequence.forEach((color, i) => {
      if (!solution.includes(color)) {
        incorrectColors++;
      }
    });
    if (incorrectColors !== 5 - correctColors - correctPosition) {
      console.log('Error: Incorrect colors count is wrong');
      return -1;
    }
  
    return [correctPosition, correctColors];  // Return feedback
  }
}