const computerPlay = () => {
    setTimeout(() => {
        switch (gameMode) {
            case 'Fácil':
                moveRandom();
                break;
            case 'Médio':
                moveMedium();
                break;
            default:
                break;
        }
    }, 1000);
};

const moveRandom = () => {
    let availableMoves = [];
    Object.values(gameBoard).forEach((value, index) => {
        value == '' && availableMoves.push(index);
    });
    let move = Math.floor(Math.random() * availableMoves.length);

    gameBoard[Object.keys(gameBoard)[availableMoves[move]]] = 'X';

    const square = document.getElementById(
        Object.keys(gameBoard)[availableMoves[move]]
    );
    square.innerHTML = `<p class="animate__animated animate__rubberBand">X</p>`;
    square.classList.add('X');

    togglePlayer();
};

const moveMedium = () => {
    let availableMoves = [];
    Object.entries(gameBoard).forEach((entry, index) => {
        entry[1] == '' && availableMoves.push(entry[0]);
    });

    let winPossibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    let bestMove = '';
    for (let pos in winPossibilities) {
        let pArray = winPossibilities[pos].split(',');
        let score = pArray.filter((option) => gameBoard[option] !== 'O');
        if (
            !score.filter((option) => gameBoard[option] == 'X').length >= 1 &&
            score.length == 1
        ) {
            bestMove = score[0];
            break;
        }
    }
    if (bestMove !== '' && availableMoves.indexOf(bestMove) !== -1) {
        gameBoard[bestMove] = 'X';

        const square = document.getElementById(bestMove);
        square.innerHTML = `<p class="animate__animated animate__rubberBand">X</p>`;
        square.classList.add('X');

        return togglePlayer();
    } else return moveRandom();
};

const moveHard = () => {};
