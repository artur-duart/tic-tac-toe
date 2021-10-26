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
  let closeMove = checkCloseFor("X");

  if(!closeMove && gameBoard.b2 == '') bestMove = 'b2';

  if(bestMove !== '') {
    gameBoard[bestMove] = 'X';
    return addMove(bestMove);
  } else if(closeMove !== '') return moveMedium();
  else return moveRandom();
};