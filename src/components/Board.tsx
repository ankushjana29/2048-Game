import React from 'react';
import { type Board } from '../logic/game';
import { Tile } from './Tile'; // CORRECTED: Named Import
import './Board.css';

interface Props {
  board: Board;
}

export const BoardComponent: React.FC<Props> = ({ board }) => { // CORRECTED: Named Export
  return (
    <div className="board">
      {board.map((row, r) =>
        row.map((val, c) => <Tile key={`${r}-${c}`} value={val} />)
      )}
    </div>
  );
};


