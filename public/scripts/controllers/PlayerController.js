const addPlayerMove = square => {
  var item = square.target.getAttribute('id');
  if (currentPlayer !== 'Computador' && gameBoard[item] === '' && isPlaying == true) {
    console.log(getCurrentPlayer("jogador1"), currentPlayer)
    gameBoard[item] = currentPlayer == getCurrentPlayer("jogador1") || currentPlayer == 'Computador' ? 'X' : 'O';

    addMove(item, gameBoard[item]);
  }
};
