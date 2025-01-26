// Helper function to calculate Manhattan Distance with linear conflicts
function manhattanDistance(state, goalState) {
    const size = Math.sqrt(state.length);
    let distance = 0;
    
    // Calculate basic Manhattan distance
    for (let i = 0; i < state.length; i++) {
        if (state[i] !== 0) {
            const goalPos = goalState.indexOf(state[i]);
            const [x1, y1] = [Math.floor(i / size), i % size];
            const [x2, y2] = [Math.floor(goalPos / size), goalPos % size];
            distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }
    }

    // Add linear conflict penalties
    // Horizontal conflicts
    for (let row = 0; row < size; row++) {
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                const pos1 = row * size + i;
                const pos2 = row * size + j;
                const tile1 = state[pos1];
                const tile2 = state[pos2];
                
                if (tile1 !== 0 && tile2 !== 0) {
                    const goalRow1 = Math.floor(goalState.indexOf(tile1) / size);
                    const goalRow2 = Math.floor(goalState.indexOf(tile2) / size);
                    
                    if (goalRow1 === goalRow2 && goalRow1 === row) {
                        if (goalState.indexOf(tile1) > goalState.indexOf(tile2)) {
                            distance += 2;
                        }
                    }
                }
            }
        }
    }

    // Vertical conflicts
    for (let col = 0; col < size; col++) {
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                const pos1 = i * size + col;
                const pos2 = j * size + col;
                const tile1 = state[pos1];
                const tile2 = state[pos2];
                
                if (tile1 !== 0 && tile2 !== 0) {
                    const goalCol1 = goalState.indexOf(tile1) % size;
                    const goalCol2 = goalState.indexOf(tile2) % size;
                    
                    if (goalCol1 === goalCol2 && goalCol1 === col) {
                        if (goalState.indexOf(tile1) > goalState.indexOf(tile2)) {
                            distance += 2;
                        }
                    }
                }
            }
        }
    }

    return distance;
}

// Optimized state encoding for faster comparison and Set operations
function encodeState(state) {
    return state.join(',');
}

// Pattern database for common subproblems (simplified version)
const patternDB = new Map();

// A* Solver with optimizations
function aStar(startState, goalState) {
    const size = Math.sqrt(startState.length);
    const openList = new MinHeap();
    const visited = new Set();
    const gScores = new Map();
    
    // Initialize
    const startNode = {
        state: startState,
        g: 0,
        h: manhattanDistance(startState, goalState),
        path: []
    };
    openList.insert(startNode);
    visited.add(encodeState(startState));
    gScores.set(encodeState(startState), 0);

    // Possible moves (up, down, left, right)
    const MOVES = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (!openList.isEmpty()) {
        const current = openList.extractMin();
        const currentStateStr = encodeState(current.state);

        if (currentStateStr === encodeState(goalState)) {
            return [...current.path, current.state];
        }

        const zeroPos = current.state.indexOf(0);
        const x = Math.floor(zeroPos / size);
        const y = zeroPos % size;

        for (let [dx, dy] of MOVES) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
                const newZeroPos = newX * size + newY;
                const newState = [...current.state];
                [newState[zeroPos], newState[newZeroPos]] = [newState[newZeroPos], newState[zeroPos]];
                
                const newStateStr = encodeState(newState);
                const tentativeG = current.g + 1;

                if (!visited.has(newStateStr) || tentativeG < gScores.get(newStateStr)) {
                    gScores.set(newStateStr, tentativeG);
                    const h = manhattanDistance(newState, goalState);
                    
                    openList.insert({
                        state: newState,
                        g: tentativeG,
                        h: h,
                        f: tentativeG + h,
                        path: [...current.path, current.state]
                    });
                    visited.add(newStateStr);
                }
            }
        }
    }
    return null;
}

// MinHeap implementation for more efficient priority queue
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].f <= this.heap[index].f) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild].f < this.heap[minIndex].f) {
                minIndex = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild].f < this.heap[minIndex].f) {
                minIndex = rightChild;
            }

            if (minIndex === index) break;
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

export { aStar, manhattanDistance };
