'use client'
import React, { useEffect, useState } from 'react';

const ROWS = 12;
const COLS = 12;
const BOMBS_COUNT = 15;

const generateEmptyGrid = () => {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ item: 0, displayed: false }))
  );
};

const placeBombsAndNumbers = () => {
  const grid = generateEmptyGrid();

  let bombsPlaced = 0;
  while (bombsPlaced < BOMBS_COUNT) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (grid[r][c].item !== '💣') {
      grid[r][c].item = '💣';
      bombsPlaced++;
    }
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],         [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].item === '💣') continue;

      let count = 0;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          if (grid[nr][nc].item === '💣') count++;
        }
      }

      grid[r][c].item = count === 0 ? '' : count;
    }
  }

  return grid;
};

const Minesweeper = () => {
  const [mineGrid, setMineGrid] = useState(placeBombsAndNumbers());
  const [timer, setTimer] = useState(30);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!started || timer <= 0 || gameOver) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [started, timer, gameOver]);

  const handleMineClick = (row, col) => {
    if (gameOver) return;
    if (!started) setStarted(true);

    const newGrid = [...mineGrid.map(row => [...row])];
    const cell = newGrid[row][col];
    if (cell.displayed) return;

    cell.displayed = true;

    if (cell.item === '💣') {
      setGameOver(true);
    } else if (cell.item !== '') {
      setScore(prev => prev + Number(cell.item));
    }

    setMineGrid(newGrid);
  };

  const handleContainerClick = () => {
    if (!started && !gameOver) {
      setStarted(true);
    }
  };

  const resetGame = () => {
    setMineGrid(placeBombsAndNumbers());
    setTimer(30);
    setScore(0);
    setGameOver(false);
    setStarted(true); // Immediately restart the timer
  };

  return (
    <div
      className="main-contaner flex items-center justify-center min-h-screen bg-gray-300"
      onClick={handleContainerClick}
    >
      <div className="bg-gray-700 border-[3px] border-gray-600 rounded-lg p-4 shadow-2xl">
        <div className="flex justify-between items-center bg-gray-200 rounded-md px-4 py-2 mb-4 border border-gray-500">
          <p className="text-lg font-semibold text-gray-800">🕒 Time left: {timer}</p>
          <p className="text-lg font-semibold text-gray-800">🏆 Score: {score}</p>
        </div>

        {gameOver && (
          <div className="text-center mb-5">
            <p className="text-xl text-red-500 font-semibold mb-3">
              💣 Game Over!!! You clicked on a mine!
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow cursor-pointer"
            >
              🔁 Restart Game
            </button>
          </div>
        )}

        <div className="flex flex-col space-y-[2px]">
          {mineGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-[3px] justify-center">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => handleMineClick(rowIndex, colIndex)}
                  className={`h-10 w-10 border border-gray-500 rounded-sm text-center flex items-center justify-center font-bold text-sm text-red shadow-sm cursor-pointer transition
                    ${cell.displayed ? 'bg-[#E0E0D1]' : 'bg-[#C0C0C0]'}
                    `}
                >
                  {cell.displayed ? cell.item : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
