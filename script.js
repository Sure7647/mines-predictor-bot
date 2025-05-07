
const gridSize = 5;
const mineCount = 5;
let mines = new Set();
let revealed = new Set();

function generateMines() {
  while (mines.size < mineCount) {
    let pos = Math.floor(Math.random() * gridSize * gridSize);
    mines.add(pos);
  }
}

function createGrid() {
  const grid = document.getElementById('grid');
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.onclick = () => revealCell(i, cell);
    grid.appendChild(cell);
  }
}

function revealCell(index, cell) {
  if (mines.has(index)) {
    cell.classList.add('mine');
    cell.textContent = 'X';
    alert('Boom! It was a mine.');
  } else {
    cell.classList.add('revealed');
    cell.textContent = '';
    revealed.add(index);
  }
}

function predictNextMove() {
  let safe = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    if (!mines.has(i) && !revealed.has(i)) {
      safe.push(i);
    }
  }
  if (safe.length) {
    let guess = safe[Math.floor(Math.random() * safe.length)];
    const cell = document.querySelector(`[data-index='${guess}']`);
    cell.style.border = '3px solid green';
    alert('Predicted safe cell at index: ' + guess);
  }
}

generateMines();
createGrid();
