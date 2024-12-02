import Guess from './guess';

export function getNextGuess(history, allPossibleCodes) {
  if (history.length === 0) {
    return ["red", "blue", "green", "yellow", "purple"]; // Initial guess
  }

  // Filter all possible codes based on the past guesses and feedback
  history.forEach(([guess, feedback]) => {
    allPossibleCodes = allPossibleCodes.filter(
      (code) => {
        const resultFeedback = new Guess(guess.sequence).compare(code);
        return resultFeedback[0] === feedback[0] && resultFeedback[1] === feedback[1];
      }
    );
  });

  let bestGuess = null;
  let minLargestGroupSize = Infinity;  // We want to minimize this

  // For each candidate guess, simulate the feedback for each remaining possible solution
  allPossibleCodes.forEach((candidateGuess) => {
    let feedbackBuckets = {};

    allPossibleCodes.forEach((solution) => {
      const feedback = new Guess(candidateGuess).compare(solution);
      const feedbackKey = feedback.join(',');  // Create a unique key for the feedback

      if (!feedbackBuckets[feedbackKey]) {
        feedbackBuckets[feedbackKey] = [];
      }
      feedbackBuckets[feedbackKey].push(solution);
    });

    // Find the size of the largest group (worst-case scenario)
    const largestGroupSize = Math.max(...Object.values(feedbackBuckets).map((bucket) => bucket.length));

    // Choose the guess that minimizes the largest group size
    if (largestGroupSize < minLargestGroupSize) {
      minLargestGroupSize = largestGroupSize;
      bestGuess = candidateGuess;
    }
  });

  return bestGuess;
}