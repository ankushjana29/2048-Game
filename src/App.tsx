import React, { useEffect, useState } from 'react';
import { BoardComponent } from './components/Board';
import { Controls } from './components/Controls';
import {
  type Board,
  type MoveResult,
  addRandomTile,
  initBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  hasMoves,
  boardsEqual
} from './logic/game';
import './App.css'; // Imports the critical tile styling

// Helper component for the aesthetic Score Box (Needed to fix the alignment of the score area)
const ScoreBox: React.FC<{ score: number }> = ({ score }) => (
  <div className="bg-gray-900 border-2 border-cyan-500/50 p-5 rounded-2xl shadow-2xl text-center transition-all duration-300 transform hover:scale-105">
    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Score</div>
    <div className="text-5xl font-extrabold text-cyan-400 
                drop-shadow-[0_0_8px_rgba(42,217,255,0.8)] 
                transition-shadow duration-500"
    >
      {score}
    </div>
  </div>
);

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(() => initBoard());
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);

  /** Handles the core move logic for any direction. */
  const handleMove = (mover: (b: Board) => MoveResult) => {
    if (gameState !== 'playing') return;

    const result = mover(board);
    
    if (boardsEqual(result.newBoard, board)) return;

    setScore(s => s + result.scoreDelta);

    const withTile = addRandomTile(result.newBoard);
    setBoard(withTile);

    if (withTile.flat().includes(2048)) {
      setGameState('won');
    } else if (!hasMoves(withTile)) {
      setGameState('lost');
    }
  };

  /** Resets the game state for a new game. */
  const handleRestart = () => {
    setBoard(initBoard());
    setGameState('playing');
    setScore(0);
  };

  // Keyboard controls useEffect
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      let mover: ((b: Board) => MoveResult) | null = null;

      if (e.key === 'ArrowLeft') mover = moveLeft;
      else if (e.key === 'ArrowRight') mover = moveRight;
      else if (e.key === 'ArrowUp') mover = moveUp;
      else if (e.key === 'ArrowDown') mover = moveDown;

      if (mover) {
        e.preventDefault(); 
        handleMove(mover);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [board, gameState]); 

  // Map directional strings to move functions for the Controls component
  const handleControlMove = (dir: 'up' | 'down' | 'left' | 'right') => {
    let mover: (b: Board) => MoveResult;
    switch (dir) {
      case 'up': mover = moveUp; break;
      case 'down': mover = moveDown; break;
      case 'left': mover = moveLeft; break;
      case 'right': mover = moveRight; break;
      default: return;
    }
    handleMove(mover);
  };
  
  return (
    // Outer container: forces content to center vertically and horizontally
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-inter">
      
      {/* Game Header (2048 Title) */}
      <h1 className="text-8xl font-black text-white mb-8 drop-shadow-lg tracking-wider">
        2048
      </h1>
      
      {/* Score Box Area (Centered) */}
      <div className="flex justify-center items-center gap-4 mb-8 w-full max-w-sm">
        {/* Score Box Component is centered because its parent div uses justify-center */}
        <ScoreBox score={score} />
      </div>
      
      {/* Board Container */}
      <div className="relative w-full max-w-lg aspect-square">
        <BoardComponent board={board} />
        
        {/* Dynamic Game Status Overlay */}
        {(gameState === 'won' || gameState === 'lost') && (
          <div className={`
            absolute inset-0 flex flex-col items-center justify-center 
            rounded-2xl bg-black/70 backdrop-blur-sm z-10 transition-opacity duration-500
          `}>
            <p className="text-5xl font-extrabold mb-8 animate-bounce">
              {gameState === 'won' ? '🎉 YOU WON! 🎉' : '💀 GAME OVER 💀'}
            </p>
            <button 
              onClick={handleRestart} 
              className="px-8 py-3 bg-red-600 text-white rounded-full font-bold text-xl shadow-2xl hover:bg-red-700 transition-transform hover:scale-105"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Controls and Hint */}
      <Controls onMove={handleControlMove} onRestart={handleRestart} />
      
      <div className="mt-6 text-gray-400 text-sm italic">
        Use Arrow Keys or the on-screen buttons to play
      </div>
    </div>
  );
};

export default App;