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

start();
difficultySelector.addEventListener('change', () => {
  gameMode = difficultySelector.options[difficultySelector.selectedIndex].value;
  
  start();
});

toggleLoadListeners();