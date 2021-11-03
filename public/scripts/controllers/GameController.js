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
  updateRanking();
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
    const database = new Database();

    if(currentPlayer == 'Sua vez') {
      winner = 'Você'
    } else {
      winner = currentPlayer;

      if(currentPlayer == getCurrentPlayer("jogador1")) {
        database.update(getCurrentPlayer("jogador1"), "wins")
        database.update(getCurrentPlayer("jogador2"), "losses")
      } else {
        database.update(getCurrentPlayer("jogador1"), "losses")
        database.update(getCurrentPlayer("jogador2"), "wins")
      }
    }
    toggleWinModal(`${winner} venceu!`);
    isPlaying = false;
  } else if (gameBoardIsFull(board)) {
    const database = new Database();

    database.update(getCurrentPlayer("jogador1"), "draws")
    database.update(getCurrentPlayer("jogador2"), "draws")

    toggleWinModal('Empate!');
    isPlaying = false;
  }
};

const getCurrentPlayer = (player) => {
  if(gameMode == 'Jogador X Jogador') {
    return url.filter(post => post.includes(player))[0].split("=")[1].split("+")[0]
  } else return currentPlayer == 'Computador' ? 'Sua vez' : 'Computador'
};

const togglePlayer = async () => {
  await checkGame(gameBoard);
  if (isPlaying == true) {
    if (gameMode !== 'Jogador X Jogador') currentPlayer = currentPlayer == 'Computador' ? 'Sua vez' : 'Computador';
    else currentPlayer = currentPlayer == getCurrentPlayer("jogador1") ? getCurrentPlayer('jogador2') : getCurrentPlayer("jogador1");    
    
    changeIndicator();
    if (currentPlayer == 'Computador') computerPlay();
  }
};

const changeIndicator = () => (document.querySelector('.player-indicator').innerHTML = `<p>${currentPlayer}</p>`);

const sortPlayer = async () => {
  const players = gameMode == 'Jogador X Jogador' ? [getCurrentPlayer("jogador1"), getCurrentPlayer('jogador2')] : ['Computador', 'Sua vez'];
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

const getL = () => {
  var bestCombination = undefined;
  var LCombinations = [
    {
      combination: [0, 7],
      bestMoves: [3, 6, 8 ]
    }, {
      combination: [0, 5],
      bestMoves: [1, 2, 8]
    }, {
      combination: [2, 7],
      bestMoves: [5, 6, 8]
    }, {
      combination: [2, 3],
      bestMoves: [0, 1, 6]
    }, {
      combination: [8, 1],
      bestMoves: [0, 2, 5]
    }, {
      combination: [8, 3],
      bestMoves: [0, 6, 7]
    }, {
      combination: [6, 1],
      bestMoves: [0, 3, 7]
    }, {
      combination: [6, 5],
      bestMoves: [2, 7, 8]
    },
  ];

  LCombinations.forEach(cb => {
    if(gameBoard[Object.keys(gameBoard)[cb.combination[0]]] == 'O' && gameBoard[Object.keys(gameBoard)[cb.combination[1]]] == 'O') bestCombination = cb;
  });

  return bestCombination;
}

const getAvailableCorners = () => {
  var availableMoves = getAvailableMoves(gameBoard);

  var corners = [0, 2, 6, 8];
  corners.forEach(move => !availableMoves.includes(move) && corners.splice(corners.indexOf(move), 1));
  return corners;
};

const addMove = (move, player) => {
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
