// Game logic module for Minesweeper

export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
  };

  export function getMinePositionsAvoidingFirstClick(rows, cols, numberOfMines, firstTile) {
    const positions = new Set();
  
    while (positions.size < numberOfMines) {
      const position = {
        x: randomNumber(rows),
        y: randomNumber(cols),
      };
      if (position.x !== firstTile.x || position.y !== firstTile.y) {
        positions.add(JSON.stringify(position));
      }
    }
  
    return Array.from(positions).map(JSON.parse);
  }


  export function createBoard(rows, cols, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(rows, cols, numberOfMines);
  
    for (let x = 0; x < rows; x++) {
      const row = [];
      for (let y = 0; y < cols; y++) {
        const tile = {
          x,
          y,
          mine: minePositions.some(position => position.x === x && position.y === y),
          status: TILE_STATUSES.HIDDEN,
          adjacentMines: 0,  // Store adjacent mine count
        };
        row.push(tile);
      }
      board.push(row);
    }
  
    return board;
  }

  export function createBoardFirstClick(rows, cols, numberOfMines, minePositions) {
    const board = [];
  
    for (let x = 0; x < rows; x++) {
      const row = [];
      for (let y = 0; y < cols; y++) {
        const tile = {
          x,
          y,
          mine: minePositions.some(position => position.x === x && position.y === y),
          status: TILE_STATUSES.HIDDEN,
          adjacentMines: 0,  // Store adjacent mine count
        };
        row.push(tile);
      }
      board.push(row);
    }
  
    return board;
  }
  
  export function markTile(tile) {
    if (tile.status === TILE_STATUSES.HIDDEN) {
      tile.status = TILE_STATUSES.MARKED;
    } else if (tile.status === TILE_STATUSES.MARKED) {
      tile.status = TILE_STATUSES.HIDDEN;
    }
  }
  
  export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) return;

  
    if (tile.mine) {
      tile.status = TILE_STATUSES.MINE;
      return;
    }
  
    tile.status = TILE_STATUSES.NUMBER;
    const adjacentTiles = nearbyTiles(board, tile);
    const mines = adjacentTiles.filter(t => t.mine);
    if (mines.length === 0) {
      adjacentTiles.forEach(adjTile => revealTile(board, adjTile));
    } else {
      tile.adjacentMines = mines.length;
    }
  }
  
  export function checkWin(board) {
    return board.every(row =>
      row.every(tile =>
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
      )
    );
  }
  
  export function checkLose(board) {
    return board.some(row =>
      row.some(tile => tile.status === TILE_STATUSES.MINE)
    );
  }
  
  function getMinePositions(rows, cols, numberOfMines) {
    const positions = new Set();
  
    while (positions.size < numberOfMines) {
      const position = {
        x: randomNumber(rows),
        y: randomNumber(cols),
      };
      positions.add(JSON.stringify(position)); // Ensure unique positions with JSON strings
    }
  
    return Array.from(positions).map(JSON.parse); // Convert back to objects
  }

  
  function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  
  function randomNumber(size) {
    return Math.floor(Math.random() * size);
  }
  
  function nearbyTiles(board, { x, y }) {
    const tiles = [];
  
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const tile = board[x + xOffset]?.[y + yOffset];
        if (tile) tiles.push(tile);
      }
    }
  
    return tiles;
  }
  