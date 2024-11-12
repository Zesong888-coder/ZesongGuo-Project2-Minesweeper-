// GamePage.jsx
import Board from './Board.jsx';
import '../styles/GamePage.css';

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function GamePage() {
  const { difficulty } = useParams();
  const [boardSize, setBoardSize] = useState({ rows: 8, cols: 8 });
  const [numberOfMines, setNumberOfMines] = useState(10);
  const [boardKey, setBoardKey] = useState(0);
  const navigate = useNavigate();

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

  const returnToHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="game-page">
      <h1>Minesweeper - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</h1>
      <div className="menu-buttons">
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
        <button className="home-button" onClick={returnToHome}>Menu</button>
      </div>
      <Board 
        key={boardKey}
        boardSize={boardSize}
        numberOfMines={numberOfMines}
      />
    </div>
  );
}

export default GamePage;
