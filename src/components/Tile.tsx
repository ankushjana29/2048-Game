import React from 'react';
import './Tile.css';

interface Props {
  value: number;
}

// *** This MUST be 'export const' to work with named imports in Board.tsx ***
export const Tile: React.FC<Props> = ({ value }) => { 
  return (
    <div className={`tile tile-${value}`}>
      {value !== 0 ? value : ''}
    </div>
  );
};
