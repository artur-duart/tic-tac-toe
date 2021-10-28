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
  }, 200);
};

const moveRandom = () => {
  var availableMoves = getAvailableMoves(gameBoard);
  var move = Math.floor(Math.random() * availableMoves.length);

  gameBoard[Object.keys(gameBoard)[availableMoves[move]]] = 'X';
  addMove(Object.keys(gameBoard)[availableMoves[move]]);
};

const moveMedium = () => {
  var bestMove = checkCloseFor('X');

  if (bestMove !== '') {
    gameBoard[bestMove] = 'X';
    addMove(bestMove);
  } else return moveRandom();
};

const moveHard = async () => {
  var bestMove = checkCloseFor('O');
  var closeMove = checkCloseFor('X');
  var availableMoves = getAvailableMoves(gameBoard);
  const filledMiddles = getFilledMiddles();
  const LCombination = getL();
  LCombination && console.log(LCombination);

  if (!closeMove && filledMiddles.length >= 2) {
    if (filledMiddles[0] == 1 && filledMiddles[1] == 3 && availableMoves.includes(0)) bestMove = 'a1';
    else if (filledMiddles[0] == 1 && filledMiddles[1] == 5 && availableMoves.includes(2)) bestMove = 'a3';
    else if (filledMiddles[0] == 3 && filledMiddles[1] == 7 && availableMoves.includes(6)) bestMove = 'c1';
    else if (filledMiddles[0] == 5 && filledMiddles[1] == 7 && availableMoves.includes(8)) bestMove = 'c3';
  } else if(LCombination) {
    LCombination.bestMoves.forEach(move => {
      if (availableMoves.includes(move)) bestMove = move;
    })
  } else if (!closeMove && gameBoard.b2 == 'O') {
    var corners = getAvailableCorners();
    bestMove = Object.keys(gameBoard)[corners[Math.floor(Math.random() * corners.length)]];
  } else if (!closeMove && gameBoard.b2 == '') bestMove = 'b2';

  if (bestMove !== '') {
    gameBoard[bestMove] = 'X';
    return addMove(bestMove);
  } else if (closeMove !== '') return moveMedium();
  else return moveRandom();
};
