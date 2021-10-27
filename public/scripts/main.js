'use strict';

let currentPlayer;
let isPlaying = false;

let difficultySelector = document.querySelector('.difficulty');

let gameMode = difficultySelector.options[difficultySelector.selectedIndex].value;
let gameBoard = {
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

let winPossibilities = ['a1,a2,a3', 'b1,b2,b3', 'c1,c2,c3', 'a1,b1,c1', 'a2,b2,c2', 'a3,b3,c3', 'a1,b2,c3', 'a3,b2,c1'];

start();
