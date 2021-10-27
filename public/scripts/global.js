const toggleWinModal = message => {
  var winModal = document.getElementById('win-modal');
  winModal.querySelector('h2').textContent = message;
  winModal.style.display = 'flex';
  animateCSS('#win-modal .modal', 'fadeInDown');
};

const toggleRankingModal = () => {
  var rankingModal = document.getElementById('ranking-modal');
  rankingModal.style.display = 'flex';
  animateCSS('#ranking-modal .modal', 'fadeInDown');
};

const toggleLoadListeners = () => {
  const resetButton = document.querySelector('.reset');
  const rankingButton = document.querySelector('.ranking');
  const modals = document.querySelectorAll('.modal-container');
  const difficultySelector = document.querySelector('.difficulty');

  resetButton && resetButton.addEventListener('click', () => getAvailableMoves(gameBoard).length !== 9 && start());
  rankingButton && rankingButton.addEventListener('click', toggleRankingModal);

  difficultySelector &&
    difficultySelector.addEventListener('change', () => {
      gameMode = difficultySelector.options[difficultySelector.selectedIndex].value;
      start();
    });

  modals &&
    modals.forEach(modal => {
      const closeModal = () => (modal.style.display = 'none');
      modal.querySelector('.bg').addEventListener('click', closeModal);

      if (modal.id == 'win-modal') {
        modal.querySelectorAll('button').forEach(button =>
          button.addEventListener('click', e => {
            if (e.target.className == 'btn-play') start();
            closeModal();
          })
        );
      }
    });
};

toggleLoadListeners();
