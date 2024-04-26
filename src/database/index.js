import fs from "node:fs";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        this.#persist();
        return;
      }

      this.#database = JSON.parse(data);
    });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database), (err) => {
      if (err) {
        throw new Error("Não foi possível persistir os dados");
      }
    });
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }

    return rowIndex > -1 ? true : false;
  }
}
