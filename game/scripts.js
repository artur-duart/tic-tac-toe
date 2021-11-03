if(url.length == 3 && url.filter(post => post.includes("gamemode=pvp"))) {
    gameMode = "Jogador X Jogador";
    difficultySelector.style.display = 'none';
    start();
}