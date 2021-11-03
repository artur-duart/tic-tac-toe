const url = window.location.href.split('/').slice(-1)[0].replace('?', '').replace('#', '').split('&');


const updateRanking = () => {
  var rankingModal = document.querySelector('#ranking-modal .modal table');
  rankingModal.innerHTML = '';
  const database = new Database();
  var allUsers = Object.values(database.getAll());
  allUsers = allUsers.sort((a, b) => JSON.parse(b).wins - JSON.parse(a).wins);
  
  for(var pos in allUsers) {
    const user = JSON.parse(allUsers[pos]);
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${Number(pos)+1}°</td>
      <td>${user.name}</td>
      <td>${user.wins}</td>
    `
    rankingModal.appendChild(tr)
  }
}

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
