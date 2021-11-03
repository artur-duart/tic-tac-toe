class Database {
    create(name) {
      if(!this.exists(name)) {
        localStorage.setItem(name, JSON.stringify({
          "name": name,
          "wins": 0,
          "losses": 0,
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

    update(name, type) {
      if(!this.exists(name)) this.create(name)
      
      const data = this.get(name);
      data[type] += 1;

      localStorage.setItem(name, JSON.stringify(data));
    }
    
    exists(name) {
      if(this.get(name)) return true;
      return false;
    }
}