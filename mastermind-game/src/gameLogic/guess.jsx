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
    if ((incorrectColors + correctColors + correctPosition) !== 5) {
      console.log('Error: Compare function has bug!');
      console.log(1 / 0);
      return -1;
    }
  
    return [correctPosition, correctColors];  // Return feedback
  }
}
