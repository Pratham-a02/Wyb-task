document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    const gridSize = parseInt(document.getElementById('grid-size').value);
    const winStreak = parseInt(document.getElementById('win-streak').value);

    if (winStreak > gridSize) {
        alert('Win streak cannot be greater than grid size.');
        return;
    }

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    const cells = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    let currentPlayer = 'X';
    let gameActive = true;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.addEventListener('click', () => handleCellClick(i, j, cell));
            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(row, col, cell) {
        if (!gameActive || cells[row][col]) return;

        cells[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(row, col)) {
            gameActive = false;
            document.getElementById('status').textContent = `${currentPlayer} wins!`;
            return;
        }

        if (cells.flat().every(cell => cell)) {
            gameActive = false;
            document.getElementById('status').textContent = 'Draw!';
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
    }

    function checkWin(row, col) {
        const directions = [
            { dr: 0, dc: 1 }, // Horizontal
            { dr: 1, dc: 0 }, // Vertical
            { dr: 1, dc: 1 }, // Diagonal
            { dr: 1, dc: -1 } // Anti-diagonal
        ];

        for (let { dr, dc } of directions) {
            let count = 1;

            for (let k = 1; k < winStreak; k++) {
                const r = row + dr * k;
                const c = col + dc * k;
                if (r < 0 || r >= gridSize || c < 0 || c >= gridSize || cells[r][c] !== currentPlayer) break;
                count++;
            }

            for (let k = 1; k < winStreak; k++) {
                const r = row - dr * k;
                const c = col - dc * k;
                if (r < 0 || r >= gridSize || c < 0 || c >= gridSize || cells[r][c] !== currentPlayer) break;
                count++;
            }

            if (count >= winStreak) return true;
        }

        return false;
    }

    document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
}