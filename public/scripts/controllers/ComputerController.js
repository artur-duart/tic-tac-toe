const computerPlay = () => {
  setTimeout(async () => {
    switch (gameMode) {
      case 'Fácil':
        moveRandom();
        break;
      case 'Médio':
        moveMedium();
        break;
        case 'Difícil':
          await moveHard();
          break;
      default:
        break;
    }
  }, 1000);
};

const moveRandom = () => {
  let availableMoves = getAvailableMoves(gameBoard);
  let move = Math.floor(Math.random() * availableMoves.length);

  gameBoard[Object.keys(gameBoard)[availableMoves[move]]] = 'X';
  addMove(Object.keys(gameBoard)[availableMoves[move]]);
};

const moveMedium = () => {  
  let bestMove = checkCloseFor("X");

  if (bestMove !== '') {
    gameBoard[bestMove] = 'X';
    addMove(bestMove);
  } else return moveRandom();
};

const moveHard = async () => {
  let bestMove = checkCloseFor("O");

  if(gameBoard.b2 == '') {
    if(gameBoard.a1 === 'O' ||
       gameBoard.a3 === 'O' ||
       gameBoard.c3 === 'O' ||
       gameBoard.c1 === 'O') bestMove = 'b2';
  }

  if(bestMove !== '') {
    gameBoard[bestMove] = 'X';
    return addMove(bestMove);
  } else if(checkCloseFor("X") !== '') return moveMedium();
  else return moveRandom();
};