# 8-Puzzle Solver using A* Search Algorithm

This project implements a solution for the classic 8-puzzle problem using the A* (A-star) search algorithm with Manhattan Distance heuristic. Feel free to check it out, [HERE](https://8-puzzle-xi.vercel.app/)!

## About the 8-Puzzle

The 8-puzzle is a sliding puzzle that consists of a 3×3 grid with 8 numbered tiles and one empty space. The goal is to rearrange the tiles from a given starting configuration to reach a specific goal configuration by sliding tiles into the empty space.

Example:

<img width="678" alt="Start" src="https://github.com/user-attachments/assets/9df0e5d9-c86b-40a3-b04b-1ac2e147a424" />

<img width="678" alt="Middle" src="https://github.com/user-attachments/assets/74b06d8c-be61-4d8c-b613-3fec2e492c05" />

<img width="678" alt="End" src="https://github.com/user-attachments/assets/5a377bf2-207a-4f8b-b377-7a87d3193d97" />

## Implementation Details

### A* Search Algorithm

The solver uses the A* search algorithm, which is an informed search algorithm that finds the shortest path from a start state to a goal state. A* uses both:

- **g(n)**: The cost to reach the current node from the start state
- **h(n)**: A heuristic estimate of the cost from the current node to the goal
- **f(n)**: The total estimated cost, where f(n) = g(n) + h(n)

### Manhattan Distance Heuristic

The implementation uses Manhattan Distance as the heuristic function. For each tile:
1. Calculate the horizontal and vertical distance between its current position and goal position
2. Sum these distances for all tiles (excluding the empty space)

This provides an admissible heuristic (never overestimates the actual cost), making it suitable for A* search.

### Key Features

- Efficient path finding using priority queue based on f-score
- Visited state tracking to avoid cycles
- Support for any valid 8-puzzle configuration
- Returns the sequence of moves to reach the solution

## Usage
```
import { aStar } from './Solver.js';
const startState = [1, 2, 3, 4, 0, 6, 7, 5, 8];
const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const solution = aStar(startState, goalState);
```

## Time Complexity

- **Worst Case**: O(b^d), where b is the branching factor (maximum 4 in 8-puzzle) and d is the solution depth
- **Space Complexity**: O(b^d) to store the nodes in the open list

## Limitations

- Not guaranteed to find a solution for unsolvable puzzle configurations
- Memory usage can be significant for complex puzzles due to storing visited states
