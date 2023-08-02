// Define the maze structure (you can customize this)
const mazeData = [
  "***************",
  "*.............*",
  "*.*.*********.*",
  "*.*.......*...*",
  "*.*.***.*.*.*.*",
  "*.*...*.*.*.*.*",
  "*.***.*.*.*.*.*",
  "*.....*.....*.*",
  "*.***.*******.*",
  "*.............*",
  "***************"
];

const mazeContainer = document.getElementById("maze");
const player = document.getElementById("player");
const numRows = mazeData.length;
const numCols = mazeData[0].length;

// Create the maze
function createMaze() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = document.createElement("div");
      cell.className = mazeData[row][col] === "*" ? "wall" : "path";
      mazeContainer.appendChild(cell);
    }
  }
}

// Get player's current position
function getPlayerPosition() {
  const playerCell = document.querySelector(".path.player");
  const cellIndex = Array.from(mazeContainer.children).indexOf(playerCell);
  return {
    row: Math.floor(cellIndex / numCols),
    col: cellIndex % numCols
  };
}

// Move the player based on the arrow keys
function movePlayer(event) {
  const playerPosition = getPlayerPosition();
  let newRow = playerPosition.row;
  let newCol = playerPosition.col;

  switch (event.key) {
    case "ArrowUp":
      newRow -= 1;
      break;
    case "ArrowDown":
      newRow += 1;
      break;
    case "ArrowLeft":
      newCol -= 1;
      break;
    case "ArrowRight":
      newCol += 1;
      break;
    default:
      return;
  }

  // Check if the new position is valid (not a wall)
  const newCell = mazeData[newRow][newCol];
  if (newCell === ".") {
    const newCellIndex = newRow * numCols + newCol;
    const newCellElement = mazeContainer.children[newCellIndex];
    player.classList.remove("player");
    newCellElement.classList.add("player");
  }

  // Check for winning condition
  if (newRow === numRows - 1 && newCol === numCols - 1) {
    alert("Congratulations! You won!");
    resetGame();
  }
}

// Reset the game
function resetGame() {
  player.classList.remove("player");
  const startCell = mazeContainer.children[0];
  startCell.classList.add("player");
}

// Initialize the game
function initializeGame() {
  createMaze();
  document.addEventListener("keydown", movePlayer);
  resetGame();
}

initializeGame();
