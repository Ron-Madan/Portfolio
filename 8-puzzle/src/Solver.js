// Helper function to calculate Manhattan Distance
function manhattanDistance(state, goalState) {
    let distance = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i] !== 0) {
            const goalPos = goalState.indexOf(state[i]);
            const currentPos = i;
            const [x1, y1] = [Math.floor(currentPos / 3), currentPos % 3]; // 2D coordinates of current tile
            const [x2, y2] = [Math.floor(goalPos / 3), goalPos % 3];       // 2D coordinates of goal tile
            distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }
    }
    return distance;
}

// A* Solver for 8-Puzzle
function aStar(startState, goalState) {
    const openList = [];
    const visited = new Set();
    const path = [];

    // Priority Queue initialization
    openList.push({ 
        state: startState, 
        g: 0, 
        h: manhattanDistance(startState, goalState), 
        f: 0 + manhattanDistance(startState, goalState), 
        path: [] 
    });
    visited.add(startState.toString());

    // Possible moves (up, down, left, right)
    const MOVES = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (openList.length > 0) {
        openList.sort((a, b) => a.f - b.f);  // Sort by f = g + h
        const current = openList.shift();    // Get state with the lowest f

        if (JSON.stringify(current.state) === JSON.stringify(goalState)) {
            return current.path;
        }

        const zeroPos = current.state.indexOf(0);
        const x = Math.floor(zeroPos / 3);
        const y = zeroPos % 3;

        // Explore neighbors
        for (let [dx, dy] of MOVES) {
            const newX = x + dx, newY = y + dy;
            if (newX >= 0 && newX < 3 && newY >= 0 && newY < 3) {
                const newZeroPos = newX * 3 + newY;
                const newState = [...current.state];
                [newState[zeroPos], newState[newZeroPos]] = [newState[newZeroPos], newState[zeroPos]]; // Swap tiles

                if (!visited.has(newState.toString())) {
                    visited.add(newState.toString());
                    openList.push({
                        state: newState,
                        g: current.g + 1,
                        h: manhattanDistance(newState, goalState),
                        f: current.g + 1 + manhattanDistance(newState, goalState),
                        path: [...current.path, newState]
                    });
                }
            }
        }
    }
    return null; // If no solution found
}

export { aStar, manhattanDistance };
