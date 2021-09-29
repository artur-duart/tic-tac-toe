"use strict";

let currentPlayer;
let isPlaying = false;
let difficultySelector = document.querySelector(".difficulty");
let gameMode = difficultySelector.options[difficultySelector.selectedIndex].value;
let gameBoard = {
  'a1': '', 'a2': '', 'a3': '',
  'b1': '', 'b2': '', 'b3': '',
  'c1': '', 'c2': '', 'c3': ''
};

const gameController = {
  reset: () => {
    gameBoard = {
      'a1': '', 'a2': '', 'a3': '',
      'b1': '', 'b2': '', 'b3': '',
      'c1': '', 'c2': '', 'c3': ''
    };
    document.querySelector('.board').innerHTML = '';
  },
  render: () => {
    for(const square in gameBoard) {
      const boardDiv = document.querySelector('.board');
      const squareDiv = document.createElement('div');
      squareDiv.id = square;
      squareDiv.className = 'square';
      squareDiv.addEventListener('click', turn.player.addMove);
      boardDiv.appendChild(squareDiv);
    }
  },
  start: () => {
    isPlaying = true;
    gameController.reset();
    gameController.render();
    gameController.sortPlayer().then(player => {
      currentPlayer = player;
      gameController.changeIndicator()
      if(player == 'Computador') turn.computer.play();
    });
  },
  checkWinFor: (player) => {
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
  },
  checkGame: async () => {
    if (gameController.checkWinFor('X') || gameController.checkWinFor('O')) {
      let winner = currentPlayer == 'Sua vez' ? 'Você' : 'O ' + currentPlayer;
      console.log(`${winner} venceu!`);
      isPlaying = false;
    }
  },
  togglePlayer: async () => {
    await gameController.checkGame();
    if(isPlaying == true) {
      if(gameMode == 'Jogador X Jogador') currentPlayer = currentPlayer == 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';
      else currentPlayer = currentPlayer == 'Sua vez' ? 'Computador' : 'Sua vez';
  
      gameController.changeIndicator();
      if(currentPlayer == 'Computador') turn.computer.play();
    }
  },
  changeIndicator: () => document.querySelector('.player-indicator').innerHTML = `<p>${currentPlayer}</p>`,
  sortPlayer: async () => {
    const players = gameMode == 'Jogador X Jogador' ? ['Jogador 1', 'Jogador 2'] : ['Computador', 'Sua vez'];
    return players[Math.floor(Math.random() * players.length)]
  }
}

const turn = {
  computer: {
    play: () => {
      switch (gameMode) {
        case 'Fácil':
          turn.computer.moveType.random();
          break;
        default:
          break;
      }
    },
    moveType: {
      random: () => {
        let availableMoves = [];
        Object.entries(gameBoard).forEach((value, index) => {
          value[1] == '' && availableMoves.push(index)
        });
        let move = Math.floor(Math.random() * availableMoves.length);
  
        gameBoard[Object.keys(gameBoard)[availableMoves[move]]] = currentPlayer == 'Jogador 1' || currentPlayer == 'Computador' ? 'X' : 'O';
  
        const square = document.getElementById(Object.keys(gameBoard)[availableMoves[move]]);
        const movement = Object.values(gameBoard)[availableMoves[move]];
        square.innerHTML = `<p>${movement}</p>`;
        square.classList.add(movement);
        
        gameController.togglePlayer();
      },
      medium: () => {},
      hard: () => {}
    }
  },
  player: {
    addMove: (square) => {
      let item = square.target.getAttribute('id');
      if (currentPlayer !== 'Computador' && gameBoard[item] === '') {
          gameBoard[item] = currentPlayer == 'Jogador 1' || currentPlayer == 'Computador' ? 'X' : 'O';

          const square = document.getElementById(item);
          square.innerHTML = `<p>${gameBoard[item]}</p>`;
          square.classList.add(gameBoard[item]);

          gameController.togglePlayer();
      }
    }
  }
}

gameController.start();
difficultySelector.addEventListener('change', () => {
  gameMode = difficultySelector.options[difficultySelector.selectedIndex].value;
  
  gameController.start();
})