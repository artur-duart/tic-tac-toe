const reset = () => {
  gameBoard = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: '',
  };
  document.querySelector('.board').innerHTML = '';
};

const render = () => {
  for (const square in gameBoard) {
    const boardDiv = document.querySelector('.board');
    const squareDiv = document.createElement('div');
    squareDiv.id = square;
    squareDiv.className = 'square';
    squareDiv.addEventListener('click', addPlayerMove);
    boardDiv.appendChild(squareDiv);
  }
};

const start = () => {
  isPlaying = true;
  reset();
  render();
  sortPlayer().then(player => {
    currentPlayer = player;
    changeIndicator();
    if (player == 'Computador') computerPlay();
  });
};

const checkWin = (board, player) => {
  for (var pos in winPossibilities) {
    var pArray = winPossibilities[pos].split(',');
    var hasWon = pArray.every(option => board[option] === player);
    if (hasWon) return true;
  }
  return false;
};

const gameBoardIsFull = board => {
  var isFull = true;
  Object.values(board).forEach(value => {
    if (value == '') isFull = false;
  });
  return isFull;
};

const checkGame = async board => {
  if (checkWin(board, 'X') || checkWin(board, 'O')) {
    var winner = currentPlayer == 'Sua vez' ? 'Você' : 'O ' + currentPlayer;
    toggleWinModal(`${winner} venceu!`);
    isPlaying = false;
  } else if (gameBoardIsFull(board)) {
    toggleWinModal('Empate!');
    isPlaying = false;
  }
};

const togglePlayer = async () => {
  await checkGame(gameBoard);
  if (isPlaying == true) {
    if (gameMode == 'Jogador X Jogador') currentPlayer = currentPlayer == 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';
    else currentPlayer = currentPlayer == 'Sua vez' ? 'Computador' : 'Sua vez';

    changeIndicator();
    if (currentPlayer == 'Computador') computerPlay();
  }
};

const changeIndicator = () => (document.querySelector('.player-indicator').innerHTML = `<p>${currentPlayer}</p>`);

const sortPlayer = async () => {
  const players = gameMode == 'Jogador X Jogador' ? ['Jogador 1', 'Jogador 2'] : ['Computador', 'Sua vez'];
  return players[Math.floor(Math.random() * players.length)];
};

const getAvailableMoves = board => {
  var availableMoves = [];
  Object.values(board).forEach((value, index) => {
    value == '' && availableMoves.push(index);
  });
  return availableMoves;
};

const getFilledMiddles = () => {
  var middles = [1, 3, 5, 7];
  var availableMoves = getAvailableMoves(gameBoard);

  var arr = [];

  middles.forEach(move => {
    if (gameBoard[Object.keys(gameBoard)[move]] == 'O' && !availableMoves.includes(move)) arr.push(move);
  });

  return arr;
};

const getAvailableCorners = () => {
  var availableMoves = getAvailableMoves(gameBoard);

  var corners = [0, 2, 6, 8];
  corners.forEach(move => !availableMoves.includes(move) && corners.splice(corners.indexOf(move), 1));
  return corners;
};

const addMove = (move, player = 'X') => {
  const square = document.getElementById(move);
  square.innerHTML = `<p class="animate__animated animate__rubberBand">${player}</p>`;
  square.classList.add(player);

  return togglePlayer();
};

const checkCloseFor = player => {
  const adversary = player == 'X' ? 'O' : 'X';
  var bestMove = '';
  for (var pos in winPossibilities) {
    var pArray = winPossibilities[pos].split(',');
    var score = pArray.filter(option => gameBoard[option] !== adversary);
    if (!score.filter(option => gameBoard[option] == player).length >= 1 && score.length == 1) {
      bestMove = score[0];
      break;
    }
  }
  return bestMove;
};
