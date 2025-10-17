// // --- Type Definitions ---
// export type TileValue = number;
// export type Board = TileValue[][]; // 4x4 array of numbers (e.g., 0, 2, 4, 8...)

// export interface MoveResult {
//   newBoard: Board;
//   scoreDelta: number; // Score gained from merging tiles
// }

// // --- Constants ---
// const BOARD_SIZE = 4;
// const INITIAL_TILE_COUNT = 2;
// const TILE_VALUES = [2, 4]; // Tiles can start as 2 or 4

// // --- Helper Functions ---

// /** Creates a deep copy of the board. */
// const copyBoard = (board: Board): Board =>
//   board.map(row => [...row]);

// /** Checks if two boards are exactly the same. */
// export const boardsEqual = (board1: Board, board2: Board): boolean => {
//   for (let r = 0; r < BOARD_SIZE; r++) {
//     for (let c = 0; c < BOARD_SIZE; c++) {
//       if (board1[r][c] !== board2[r][c]) {
//         return false;
//       }
//     }
//   }
//   return true;
// };

// /** Finds all empty (zero) cells on the board. */
// const getEmptyCells = (board: Board): { r: number, c: number }[] => {
//   const empty: { r: number, c: number }[] = [];
//   for (let r = 0; r < BOARD_SIZE; r++) {
//     for (let c = 0; c < BOARD_SIZE; c++) {
//       if (board[r][c] === 0) {
//         empty.push({ r, c });
//       }
//     }
//   }
//   return empty;
// };

// /** Adds a random 2 or 4 tile to an empty cell. */
// // *** THIS FUNCTION IS NOW EXPLICITLY EXPORTED ***
// export const addRandomTile = (board: Board): Board => {
//   const newBoard = copyBoard(board);
//   const emptyCells = getEmptyCells(newBoard);

//   if (emptyCells.length === 0) {
//     return newBoard; // No room
//   }

//   const index = Math.floor(Math.random() * emptyCells.length);
//   const { r, c } = emptyCells[index];
  
//   // 90% chance of a 2, 10% chance of a 4
//   const value = Math.random() < 0.9 ? 2 : 4;
//   newBoard[r][c] = value;

//   return newBoard;
// };

// // --- Initialization ---

// /** Creates the initial 4x4 board with two random tiles. */
// export const initBoard = (): Board => {
//   let board: Board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
  
//   // Add initial tiles
//   for (let i = 0; i < INITIAL_TILE_COUNT; i++) {
//     board = addRandomTile(board);
//   }
//   return board;
// };

// // --- Core Move Logic ---

// /** Slides and merges a single line (row or column). */
// const slideAndMergeLine = (line: TileValue[]): { newLine: TileValue[], score: number } => {
//   let score = 0;
//   // 1. Filter out zeros (slide)
//   let filtered = line.filter(val => val !== 0);

//   // 2. Merge adjacent equal tiles
//   for (let i = 0; i < filtered.length - 1; i++) {
//     if (filtered[i] !== 0 && filtered[i] === filtered[i + 1]) {
//       filtered[i] *= 2;      // Double the tile
//       score += filtered[i];   // Add to score
//       filtered[i + 1] = 0;    // Remove the merged tile
//     }
//   }

//   // 3. Filter out new zeros and pad with zeros at the end
//   filtered = filtered.filter(val => val !== 0);
//   const newLine = filtered.concat(Array(BOARD_SIZE - filtered.length).fill(0));

//   return { newLine, score };
// };

// /** Rotates the board 90 degrees clockwise. Used to simplify move logic. */
// const rotateBoard = (board: Board): Board => {
//   const newBoard = initBoard().map(() => Array(BOARD_SIZE).fill(0));
//   for (let r = 0; r < BOARD_SIZE; r++) {
//     for (let c = 0; c < BOARD_SIZE; c++) {
//       newBoard[c][BOARD_SIZE - 1 - r] = board[r][c];
//     }
//   }
//   return newBoard;
// };

// /** The generic move function, which operates on rows (move right). */
// const move = (board: Board): MoveResult => {
//   const newBoard = copyBoard(board);
//   let totalScoreDelta = 0;

//   for (let r = 0; r < BOARD_SIZE; r++) {
//     // Reverse the row to simulate moving right (slideAndMergeLine works LTR)
//     const reversedRow = newBoard[r].slice().reverse(); 
    
//     const result = slideAndMergeLine(reversedRow);
//     totalScoreDelta += result.score;
    
//     // Reverse the line back and update the board
//     newBoard[r] = result.newLine.reverse();
//   }

//   return { newBoard, scoreDelta: totalScoreDelta };
// };


// // --- Directional Moves ---

// // Moves are implemented by rotating the board until the desired direction 
// // becomes the 'move right' direction, then executing the generic move, and rotating back.

// /** Move the board tiles up. */
// export const moveUp = (board: Board): MoveResult => {
//   // Rotate 90 deg counter-clockwise (3 rotations clockwise)
//   const rot1 = rotateBoard(board);
//   const rot2 = rotateBoard(rot1);
//   const rot3 = rotateBoard(rot2); 
  
//   const result = move(rot3);

//   // Rotate 90 deg clockwise back to original orientation
//   const finalBoard = rotateBoard(result.newBoard); 

//   return { newBoard: finalBoard, scoreDelta: result.scoreDelta };
// };

// /** Move the board tiles down. */
// export const moveDown = (board: Board): MoveResult => {
//   // Rotate 90 deg clockwise
//   const rot1 = rotateBoard(board); 
  
//   const result = move(rot1);

//   // Rotate 90 deg counter-clockwise (3 rotations clockwise) back to original orientation
//   const rot2 = rotateBoard(result.newBoard);
//   const rot3 = rotateBoard(rot2);
//   const finalBoard = rotateBoard(rot3); 

//   return { newBoard: finalBoard, scoreDelta: result.scoreDelta };
// };

// /** Move the board tiles left. */
// export const moveLeft = (board: Board): MoveResult => {
//   // Move Left is equivalent to: Rotate 180 deg, Move Right, Rotate 180 deg
//   const rot1 = rotateBoard(board);
//   const rot2 = rotateBoard(rot1);
  
//   const result = move(rot2);

//   const rot3 = rotateBoard(result.newBoard);
//   const finalBoard = rotateBoard(rot3);

//   return { newBoard: finalBoard, scoreDelta: result.scoreDelta };
// };

// /** Move the board tiles right. (This is the base function) */
// export const moveRight = (board: Board): MoveResult => move(board);


// // --- Game State Check ---

// /** Checks if any moves are possible (for game over condition). */
// export const hasMoves = (board: Board): boolean => {
//   // 1. Check for empty cells (if there's space, a move is possible)
//   if (getEmptyCells(board).length > 0) return true;

//   // 2. Check for possible merges horizontally
//   for (let r = 0; r < BOARD_SIZE; r++) {
//     for (let c = 0; c < BOARD_SIZE - 1; c++) {
//       if (board[r][c] === board[r][c + 1]) {
//         return true;
//       }
//     }
//   }

//   // 3. Check for possible merges vertically
//   for (let c = 0; c < BOARD_SIZE; c++) {
//     for (let r = 0; r < BOARD_SIZE - 1; r++) {
//       if (board[r][c] === board[r + 1][c]) {
//         return true;
//       }
//     }
//   }

//   return false;
// };


export type TileValue = number;
export type Board = TileValue[][];

export interface MoveResult {
    newBoard: Board;
    scoreDelta: number;
}

const BOARD_SIZE = 4;
const INITIAL_TILES = 2;
const TILE_PROBABILITIES = [
    { value: 2, probability: 0.9 },
    { value: 4, probability: 0.1 }
];

/** Initializes a 4x4 board with two random starting tiles. */
export function initBoard(): Board {
    let board: Board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    for (let i = 0; i < INITIAL_TILES; i++) {
        board = addRandomTile(board);
    }
    return board;
}

/** Adds a single random 2 or 4 tile to an empty spot on the board. */
export function addRandomTile(board: Board): Board {
    const emptyCells: { r: number, c: number }[] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }

    if (emptyCells.length === 0) return board;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { r, c } = emptyCells[randomIndex];

    // Determine 2 or 4 based on probability
    const rand = Math.random();
    let newValue = TILE_PROBABILITIES[0].value;
    if (rand > TILE_PROBABILITIES[0].probability) {
        newValue = TILE_PROBABILITIES[1].value;
    }

    const newBoard = board.map(row => [...row]); // Deep clone
    newBoard[r][c] = newValue;
    return newBoard;
}

/** Compares two boards for equality. */
export function boardsEqual(boardA: Board, boardB: Board): boolean {
    if (boardA.length !== boardB.length) return false;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (boardA[r][c] !== boardB[r][c]) return false;
        }
    }
    return true;
}

/** Checks if any move is possible (merges or empty cells). */
export function hasMoves(board: Board): boolean {
    // 1. Check for empty cells
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === 0) return true;
        }
    }

    // 2. Check for horizontal merges
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE - 1; c++) {
            if (board[r][c] !== 0 && board[r][c] === board[r][c + 1]) return true;
        }
    }

    // 3. Check for vertical merges
    for (let c = 0; c < BOARD_SIZE; c++) {
        for (let r = 0; r < BOARD_SIZE - 1; r++) {
            if (board[r][c] !== 0 && board[r][c] === board[r + 1][c]) return true;
        }
    }

    return false;
}

// --- CORE MOVEMENT LOGIC ---

/** Takes a single row/column and compacts/merges it (e.g., [2, 0, 2, 4] -> [4, 4, 0, 0]) */
function slideAndMerge(line: TileValue[]): { newLine: TileValue[], scoreDelta: number } {
    let scoreDelta = 0;
    
    // 1. Compact: Remove zeros
    let compacted = line.filter(val => val !== 0);

    // 2. Merge: Combine equal adjacent tiles
    for (let i = 0; i < compacted.length - 1; i++) {
        if (compacted[i] === compacted[i + 1]) {
            compacted[i] *= 2;
            scoreDelta += compacted[i]; // Add the new tile value to score
            compacted.splice(i + 1, 1); // Remove the merged tile
            compacted.push(0); // Add a zero to maintain length
        }
    }

    // 3. Pad: Fill the rest with zeros
    const padding = BOARD_SIZE - compacted.length;
    const newLine = [...compacted, ...Array(padding).fill(0)];
    
    return { newLine, scoreDelta };
}

// --- DIRECTIONAL MOVES ---

/** Helper to apply the slide and merge logic to all rows (for Left/Right moves). */
function applyMove(board: Board, direction: 'left' | 'right'): MoveResult {
    let newBoard: Board = [];
    let scoreDelta = 0;

    for (const row of board) {
        let line = [...row];
        if (direction === 'right') {
            line.reverse();
        }

        const result = slideAndMerge(line);
        scoreDelta += result.scoreDelta;
        
        let newLine = result.newLine;
        if (direction === 'right') {
            newLine.reverse();
        }
        newBoard.push(newLine);
    }
    return { newBoard, scoreDelta };
}

/** Helper to transpose the board (rows become columns, and vice versa) */
function transpose(board: Board): Board {
    const newBoard: Board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            newBoard[c][r] = board[r][c];
        }
    }
    return newBoard;
}

/** Move Right: Treated as Left on the reversed board. */
export function moveRight(board: Board): MoveResult {
    return applyMove(board, 'right');
}

/** Move Left: Standard application of slideAndMerge on rows. */
export function moveLeft(board: Board): MoveResult {
    return applyMove(board, 'left');
}

/** Move Up: Transpose, then move Left, then transpose back. */
export function moveUp(board: Board): MoveResult {
    let transposed = transpose(board);
    const result = applyMove(transposed, 'left');
    return {
        newBoard: transpose(result.newBoard),
        scoreDelta: result.scoreDelta
    };
}

/** Move Down: Transpose, then move Right, then transpose back. */
export function moveDown(board: Board): MoveResult {
    let transposed = transpose(board);
    const result = applyMove(transposed, 'right');
    return {
        newBoard: transpose(result.newBoard),
        scoreDelta: result.scoreDelta
    };
}