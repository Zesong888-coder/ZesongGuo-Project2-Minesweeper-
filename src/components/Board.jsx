import '../styles/Board.css';

import React, { useEffect, useState } from "react";
import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
  createBoardFirstClick,
  getMinePositionsAvoidingFirstClick,
} from "../utils/minesweeperLogic";


function Board({ boardSize, numberOfMines }) {
  const [board, setBoard] = useState([]);
  const [minesLeft, setMinesLeft] = useState(numberOfMines);
  const [gameStatus, setGameStatus] = useState("");
  const [firstClick, setFirstClick] = useState(true); // New state to track the first click

  useEffect(() => {
    // Initialize the empty board (no mines yet)
    const newBoard = createBoard(boardSize.rows, boardSize.cols, 0);
    setBoard(newBoard);
    setMinesLeft(numberOfMines);
    setGameStatus("");
  }, [boardSize, numberOfMines]);

  const initializeBoardWithMines = (tile) => {
    const minePositions = getMinePositionsAvoidingFirstClick(
      boardSize.rows,
      boardSize.cols,
      numberOfMines,
      tile
    );
  
    // Create the new board with mines placed
    const newBoard = createBoardFirstClick(
      boardSize.rows,
      boardSize.cols,
      tile,
      minePositions
    );
  
    return newBoard; // Return the updated board
  };  

  const handleTileClick = (tile) => {
    if (gameStatus) return;
  
    let updatedBoard;
  
    if (firstClick) {
      // Initialize the board with mines and reveal the clicked tile
      updatedBoard = initializeBoardWithMines(tile);
      setFirstClick(false); // Ensure we only initialize the mines once
    } else {
      // Work with the current board on subsequent clicks
      updatedBoard = [...board];
    }
  
    // Reveal the clicked tile on the updated board
    revealTile(updatedBoard, tile);
    setBoard(updatedBoard); // Update the board with the revealed tile
  
    // Check for win or lose condition after revealing a tile
    if (checkWin(updatedBoard)) {
      setGameStatus("You Win!");
    } else if (checkLose(updatedBoard)) {
      // Reveal all mines on the board when the player loses
      updatedBoard.flat().forEach((t) => {
        if (t.mine) t.status = TILE_STATUSES.MINE;
      });
      setBoard(updatedBoard);
      setGameStatus("You Lose!");
    }
  };
  
  

  const handleTileRightClick = (e, tile) => {
    e.preventDefault();
    if (gameStatus) return;

    const updatedBoard = [...board];
    markTile(tile);
    setBoard(updatedBoard);
    setMinesLeft(numberOfMines - updatedBoard.flat().filter(t => t.status === TILE_STATUSES.MARKED).length);
  };

  return (
    <div className="game-container">
      <div className="subtext">{gameStatus || `Mines Left: ${minesLeft}`}</div>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${boardSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize.rows}, 1fr)`,
        }}
      >
        {board.flat().map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile.status}`}
            onClick={() => handleTileClick(tile)}
            onContextMenu={(e) => handleTileRightClick(e, tile)}
          >
            {tile.status === TILE_STATUSES.NUMBER && tile.adjacentMines > 0 ? tile.adjacentMines : ""}
            {tile.status === TILE_STATUSES.MINE ? "💣" : ""}
            {tile.status === TILE_STATUSES.MARKED ? "🚩" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
