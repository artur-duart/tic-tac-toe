const reset = () => {
    gameBoard = {
        'a1': '', 'a2': '', 'a3': '',
        'b1': '', 'b2': '', 'b3': '',
        'c1': '', 'c2': '', 'c3': ''
    };
    document.querySelector('.board').innerHTML = '';
}

const render = () => {
    for (const square in gameBoard) {
        const boardDiv = document.querySelector('.board');
        const squareDiv = document.createElement('div');
        squareDiv.id = square;
        squareDiv.className = 'square';
        squareDiv.addEventListener('click', addPlayerMove);
        boardDiv.appendChild(squareDiv);
    }
}

const start = () => {
    isPlaying = true;
    reset();
    render();
    sortPlayer().then(player => {
        currentPlayer = player;
        changeIndicator()
        if (player == 'Computador') computerPlay();
    });
}

const checkWinFor = (player) => {
    let winPossibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let pos in winPossibilities) {
        let pArray = winPossibilities[pos].split(',');
        let hasWon = pArray.every(option => gameBoard[option] === player);
        if (hasWon) return true;
        
    }
    return false;
}

const gameBoardIsFull = (gameBoard) => {
    let isFull = true;
    Object.values(gameBoard).forEach(value => {
        if(value == '') isFull = false;
    });
    return isFull;
}

const checkGame = async () => {
    if (checkWinFor('X') || checkWinFor('O')) {
        let winner = currentPlayer == 'Sua vez' ? 'Você' : 'O ' + currentPlayer;
        toggleWinModal(`${winner} venceu!`);
        isPlaying = false;
    } else if(gameBoardIsFull(gameBoard)) {
        toggleWinModal('Empate!');
        isPlaying = false;
    }
}

const toggleWinModal = message => {
    let winModal = document.getElementById('win-modal');
    winModal.querySelector('h2').textContent = message;
    winModal.style.display = 'flex';
    animateCSS('.modal', 'fadeInDown')
} 

const togglePlayer = async () => {
    await checkGame();
    if (isPlaying == true) {
        if (gameMode == 'Jogador X Jogador') currentPlayer = currentPlayer == 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';
        else currentPlayer = currentPlayer == 'Sua vez' ? 'Computador' : 'Sua vez';

        changeIndicator();
        if (currentPlayer == 'Computador') computerPlay();
    }
}

const changeIndicator = () => document.querySelector('.player-indicator').innerHTML = `<p>${currentPlayer}</p>`

const sortPlayer = async () => {
    const players = gameMode == 'Jogador X Jogador' ? ['Jogador 1', 'Jogador 2'] : ['Computador', 'Sua vez'];
    return players[Math.floor(Math.random() * players.length)]
}