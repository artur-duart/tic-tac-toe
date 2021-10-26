const Database = {
  user: {
    create: (name) => {},
    getAll: () => {},
    update: (name, type, mode = '') => {},
    exists: (name) => {}
  }
}

/* MODELO DOS DADOS:
  [
    {
      "name": "",
      "wins": {
        "pvp": 0,
        "easy": 0,
        "medium": 0,
        "hard": 0
      },
      "losses": {
        "pvp": 0,
        "easy": 0,
        "medium": 0,
        "hard": 0
      },
      "draws": 0
    }
  ]
*/