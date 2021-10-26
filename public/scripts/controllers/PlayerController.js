const addPlayerMove = square => {
  let item = square.target.getAttribute('id');
  if (currentPlayer !== 'Computador' && gameBoard[item] === '' && isPlaying == true) {
    gameBoard[item] = currentPlayer == 'Jogador 1' || currentPlayer == 'Computador' ? 'X' : 'O';

    const square = document.getElementById(item);
    square.innerHTML = `<p class="animate__animated animate__rubberBand">${gameBoard[item]}</p>`;
    square.classList.add(gameBoard[item]);

    togglePlayer();
  }
};
