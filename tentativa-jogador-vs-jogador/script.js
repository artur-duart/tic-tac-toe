// Initial Data
let frame = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: ''
}

let player = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', squareClick)
});

// Functions
function squareClick(event) {
    let square = event.target.getAttribute('data-square');
    if (playing &&  frame[square] === '') {
        frame[square] = player;
        renderFrame();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'X' : 'O';

    for (let i in frame) {
        frame[i] = '';
    }

    playing = true;

    renderFrame();
    renderInfo();
}

function renderFrame() {
    for (let i in frame) {
        let square = document.querySelector(`div[data-square=${i}]`);
        square.innerHTML = frame[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;

    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'X') ? 'O' : 'X';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'O "X" venceu'
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "O" venceu'
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate'
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => frame[option] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in frame) {
        if (frame[i] === '') {
            return false;
        }
    }

    return true;
}