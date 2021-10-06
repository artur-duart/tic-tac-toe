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
        
        togglePlayer();
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

          togglePlayer();
      }
    }
  }
}

start();
difficultySelector.addEventListener('change', () => {
  gameMode = difficultySelector.options[difficultySelector.selectedIndex].value;
  
  start();
})