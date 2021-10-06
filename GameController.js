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
        squareDiv.addEventListener('click', turn.player.addMove);
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
        if (player == 'Computador') turn.computer.play();
    });
}

const checkWinFor = (player) => {
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
        let hasWon = pArray.every(option => gameBoard[option] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

const checkGame = async () => {
    if (checkWinFor('X') || checkWinFor('O')) {
        let winner = currentPlayer == 'Sua vez' ? 'Você' : 'O ' + currentPlayer;
        // console.log(`${winner} venceu!`);
        document.getElementById('win-modal').querySelector('h2').textContent = `${winner} venceu!`;
        document.getElementById('win-modal').style.display = 'flex';
        isPlaying = false;
    }
}

const togglePlayer = async () => {
    await checkGame();
    if (isPlaying == true) {
        if (gameMode == 'Jogador X Jogador') currentPlayer = currentPlayer == 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';
        else currentPlayer = currentPlayer == 'Sua vez' ? 'Computador' : 'Sua vez';

        changeIndicator();
        if (currentPlayer == 'Computador') turn.computer.play();
    }
}

const changeIndicator = () => document.querySelector('.player-indicator').innerHTML = `<p>${currentPlayer}</p>`

const sortPlayer = async () => {
    const players = gameMode == 'Jogador X Jogador' ? ['Jogador 1', 'Jogador 2'] : ['Computador', 'Sua vez'];
    return players[Math.floor(Math.random() * players.length)]
}