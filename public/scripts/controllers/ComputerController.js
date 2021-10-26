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
  let availableMoves = getAvailableMoves();
  let move = Math.floor(Math.random() * availableMoves.length);

  gameBoard[Object.keys(gameBoard)[availableMoves[move]]] = 'X';

  const square = document.getElementById(Object.keys(gameBoard)[availableMoves[move]]);
  square.innerHTML = `<p class="animate__animated animate__rubberBand">X</p>`;
  square.classList.add('X');

  togglePlayer();
};

const moveMedium = () => {
  let availableMoves = getAvailableMoves();
  
  let bestMove = '';
  for (let pos in winPossibilities) {
    let pArray = winPossibilities[pos].split(',');
    let score = pArray.filter(option => gameBoard[option] !== 'O');
    if (!score.filter(option => gameBoard[option] == 'X').length >= 1 && score.length == 1) {
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
