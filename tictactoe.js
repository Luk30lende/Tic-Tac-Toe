let board;
let playerO = "O";
let playerX = "X";
let currentPlayer = playerX;
let gameOver = false;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  // Draw the horizintal and verticle lines
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", setTile);
      document.getElementById("board").appendChild(tile);
    }
  }
}

function setTile() {
  if (gameOver || currentPlayer === playerO) {
    return; // Prevent further moves if game is over or it's the computer's turn
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  if (board[r][c] != " ") {
    return; // ignore if tile is already occupied
  }

  board[r][c] = playerX;
  this.innerText = playerX;

  if (checkWinner(playerX)) return; // Check if player wins

  currentPlayer = playerO; // switch to the computer / AI
  setTimeout(computerMove, 500); // delay computer's move for better gaming experience
}

function computerMove() {
  if (gameOver) return;

  // AI first tries to win, then block, then pick a random move
  let move =
    findWinningMove(playerO) || findWinningMove(playerX) || getRandomMove();
  if (!move) return;

  let { r, c } = move;
  board[r][c] = playerO;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  tile.innerText = playerO;

  if (checkWinner(playerO)) return;

  currentPlayer = playerX;
}

function findWinningMove(player) {
  // Checks if the given player can win in the next move
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === " ") {
        board[r][c] = player;
        if (checkWinner(player, true)) {
          board[r][c] = " "; // Reset after simulation
          return { r, c };
        }
        board[r][c] = " ";
      }
    }
  }
  return null;
}

function getRandomMove() {
  // Picks a random available tile if no winning/blocking move is found
  let emptyTiles = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === " ") {
        emptyTiles.push({ r, c });
      }
    }
  }
  return emptyTiles.length > 0
    ? emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    : null;
}

function checkWinner(player, isSimulating = false) {
  // Defines all possible winning patterns
  let winPatterns = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let pattern of winPatterns) {
    if (pattern.every(([r, c]) => board[r][c] === player)) {
      if (!isSimulating) {
        highlightWinner(pattern); // Highlights winning tiles
        gameOver = true;
      }
      return true;
    }
  }
  return false;
}

function highlightWinner(tiles) {
  // Visually highlights the winning tiles
  tiles.forEach(([r, c]) => {
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.classList.add("winner");
  });
}

//change players
// if (currentPlayer == playerX) {
//   currentPlayer = playerO;
// } else {
//   currentPlayer = playerX;
// }

// checkWinner();

// let emptyTiles = [];
// for (let r = 0; r < 3; r++) {
//   for (let c = 0; c < 3; c++) {
//     if (board[r][c] === " ") {
//       emptyTiles.push({ r, c });
//     }
//   }
// }

// if (emptyTiles.length === 0) return; // no moves left

// let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]; // Random move
// board[r][c] = playerO;
// let tile = document.getElementById(r.toString() + "-" + c.toString());
// tile.innerText = playerO;

// if (checkWinner(playerO)) return; // check if computer wins

// currentPlayer = playerX; // switch back to player

// function checkWinner(player) {
//   // Horizontally
//   for (let r = 0; r < 3; r++) {
//     if (
//       board[r][0] === player &&
//       board[r][1] === player &&
//       board[r][2] === player
//     ) {
//       highlightWinner([
//         [r, 0],
//         [r, 1],
//         [r, 2],
//       ]);
//       gameOver = true;
//       return true;
//     }
//   }

//   // Vertically
//   for (let c = 0; c < 3; c++) {
//     if (
//       board[0][c] === player &&
//       board[1][c] === player &&
//       board[2][c] === player
//     ) {
//       highlightWinner([
//         [0, c],
//         [1, c],
//         [2, c],
//       ]);
//       gameOver = true;
//       return true;
//     }
//   }

//   // Diagonally
//   if (
//     board[0][0] === player &&
//     board[1][1] === player &&
//     board[2][2] === player
//   ) {
//     highlightWinner([
//       [0, 0],
//       [1, 1],
//       [2, 2],
//     ]);
//     gameOver = true;
//     return true;
//   }

//   // Anti-diagonally
//   if (
//     board[0][2] === player &&
//     board[1][1] === player &&
//     board[2][0] === player
//   ) {
//     highlightWinner([
//       [0, 2],
//       [1, 1],
//       [2, 0],
//     ]);
//     gameOver = true;
//     return true;
//   }

//   return false;
// }
