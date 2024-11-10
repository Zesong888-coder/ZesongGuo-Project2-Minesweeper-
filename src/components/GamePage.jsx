// GamePage.jsx
import Board from './Board.jsx';
import '../styles/GamePage.css';

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function GamePage() {
  const { difficulty } = useParams();
  const [boardSize, setBoardSize] = useState({ rows: 8, cols: 8 });
  const [numberOfMines, setNumberOfMines] = useState(10);
  const [boardKey, setBoardKey] = useState(0);

  const setDifficulty = (difficulty) => {
    switch (difficulty) {
      case "easy":
        setBoardSize({ rows: 8, cols: 8 });
        setNumberOfMines(10);
        break;
      case "medium":
        setBoardSize({ rows: 16, cols: 16 });
        setNumberOfMines(40);
        break;
      case "hard":
        setBoardSize({ rows: 30, cols: 16 });
        setNumberOfMines(99);
        break;
      default:
        setBoardSize({ rows: 8, cols: 8 });
        setNumberOfMines(10);
    }
  };

  useEffect(() => {
    setDifficulty(difficulty);
  }, [difficulty]);

  const resetGame = () => {
    setDifficulty(difficulty);
    setBoardKey(prevKey => prevKey + 1);
  };

  return (
    <div className="game-page">
      <h1>Minesweeper - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</h1>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
      <Board 
        key={boardKey}
        boardSize={boardSize}
        numberOfMines={numberOfMines}
      />
    </div>
  );
}

export default GamePage;
