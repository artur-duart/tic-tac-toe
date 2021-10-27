class Database {
    create(name) {
      if(!this.exists(name)) {
        localStorage.setItem(name, JSON.stringify({
          "name": name,
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
        }));
      }
      return this.get(name);
    }

    get(name) {
      return JSON.parse(localStorage.getItem(name));
    }

    getAll() {
      return { ...localStorage };
    }

    update(name, type, mode = '') {
      const data = this.get(name);

      if(mode !== '') data[type][mode] += 1;
      else data[type] += 1;

      localStorage.setItem(name, JSON.stringify(data));
    }
    
    exists(name) {
      if(this.get(name)) return true;
      return false;
    }
}