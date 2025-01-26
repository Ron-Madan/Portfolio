# 8-Puzzle Solver using A* Search Algorithm

This project implements a solution for the classic 8-puzzle problem using the A* (A-star) search algorithm with Manhattan Distance heuristic. Feel free to check it out, [HERE](https://8-puzzle-xi.vercel.app/)!

## About the 8-Puzzle

The 8-puzzle is a sliding puzzle that consists of a 3×3 grid with 8 numbered tiles and one empty space. The goal is to rearrange the tiles from a given starting configuration to reach a specific goal configuration by sliding tiles into the empty space. If you're feeling ambitious, you can also try the 15-puzzle on a 4x4 grid!

## How to Play?

You can click on any tile adjacent to the blank square to move that tile into the blank space. If you get stuck, hit "Solve" and watch the AI work its magic!

Example:

<img width="780" alt="Screenshot 2025-01-26 at 6 25 45 PM" src="https://github.com/user-attachments/assets/40b49dcb-09bb-49a6-8887-74d8c90f3e9c" />

<img width="780" alt="Screenshot 2025-01-26 at 6 26 17 PM" src="https://github.com/user-attachments/assets/f6931bb5-8819-4045-84a1-8e572d0dad0c" />

<img width="780" alt="Screenshot 2025-01-26 at 6 27 32 PM" src="https://github.com/user-attachments/assets/cd0ee3cc-1b5d-4fb8-8850-1539c72abb1d" />

## Implementation Details

### A* Search Algorithm

The solver uses the A* search algorithm, which is an informed search algorithm that finds the shortest path from a start state to a goal state. A* uses both:

- **g(n)**: The cost to reach the current node from the start state
- **h(n)**: A heuristic estimate of the cost from the current node to the goal
- **f(n)**: The total estimated cost, where f(n) = g(n) + h(n)

### Manhattan Distance Heuristic

The implementation uses an enhanced Manhattan Distance heuristic that includes linear conflict detection:

1. **Basic Manhattan Distance**:
   - Calculate horizontal and vertical distance between current and goal positions for each tile
   - Sum these distances for all tiles (excluding the empty space)

2. **Linear Conflict Enhancement**:
   - Adds penalties when two tiles are in their goal row/column but in reverse order
   - Each linear conflict adds 2 moves to the heuristic estimate
   - Example: If tiles 1 and 2 are in their goal row but 2 appears before 1, this requires at least 2 additional moves to resolve

This enhanced heuristic remains admissible while providing a more accurate estimate of the actual cost to reach the goal state.

### Solver Optimizations

#### State Representation
- **Compact State Storage**: States are stored as flat arrays instead of 2D matrices to reduce memory usage and improve comparison speed
- **String-based State Tracking**: States are converted to strings for efficient hash table lookups in the visited set
- **Immutable State Handling**: Each new state is created using array spreading to prevent unintended state mutations

#### Search Optimizations
- **Priority Queue Implementation**: Custom priority queue for efficient O(log n) insertion and removal of states
- **Early Goal Detection**: Checks for goal state immediately after generating each new state
- **Pruning Invalid Moves**: 
  - Prevents moving empty tile back to its previous position
  - Eliminates moves that would return to already visited states
- **Move Generation**:
  - Pre-calculated move directions (up, down, left, right) to avoid redundant calculations
  - Efficient boundary checking for valid moves
  - Smart move filtering based on empty tile position

#### Memory Management
- **Visited State Tracking**: Uses a Set data structure for O(1) lookup of previously seen states
- **Path Reconstruction**: Maintains minimal parent references to reconstruct solution path
- **Memory-Efficient Node Structure**: Only stores essential information in each node:
  - Current state
  - Parent reference
  - g-score (path cost)
  - h-score (heuristic value)

#### Performance Enhancements
- **Linear Conflict Detection**: 
  - Horizontal conflict checking for tiles in the same row
  - Vertical conflict checking for tiles in the same column
  - Dynamically adjusts heuristic value based on detected conflicts
- **Lazy Path Generation**: Only constructs the full solution path once the goal is found
- **State Validation**: Early detection of unsolvable puzzle configurations

#### Heuristic Optimizations
- **Pattern Database**: Pre-computed lookup table for common subproblems
- **Dynamic Weighting**: Adjusts heuristic weight based on search progress
- **Conflict Detection**:
  - Row-based conflict detection
  - Column-based conflict detection
  - Diagonal pattern analysis
- **Goal State Analysis**:
  - Pre-computed goal state positions
  - Quick lookup for goal row/column calculations
  - Optimized distance calculations using bit operations

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
