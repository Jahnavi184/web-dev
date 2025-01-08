const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const reset = document.getElementById('reset');

let CurrentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let Active = true;

const WinningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function clicking(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !Active) {
        return;
    }

    board[index] = CurrentPlayer;
    cell.textContent = CurrentPlayer;

    checkResult();
}

function checkResult() {
    for (let condition of WinningConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            Active = false;
            result.textContent = `${CurrentPlayer} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        result.textContent = "It's a draw!";
        Active = false;
        return;
    }

    // to switch players from x to o and o to x
    if (CurrentPlayer === 'X') {
        CurrentPlayer = 'O'; 
    } else {
        CurrentPlayer = 'X'; 
    }
    
}

function resetGame() {
    board.fill('');
    Active = true;

    cells.forEach(cell => {
        cell.textContent = '';
        result.textContent = '';
    });

   // restart
    CurrentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', clicking));
reset.addEventListener('click', resetGame);

