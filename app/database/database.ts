import * as sqlite3 from 'sqlite3';
import { Lorem } from './../../src/models/lorem';

export function initializeDatabase() {
  sqlite3.verbose();
  const db = new sqlite3.Database('mydb.db');

  db.serialize(() => {
    db.run("CREATE TABLE if not exists lorem (info TEXT)");
    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();
    db.each("SELECT rowid AS id, info FROM lorem", (err: Error | null, row: { id: number, info: string }) => {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });
  db.close();
}

export function getDatos(): Promise<Lorem[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydb.db');
    const query = 'SELECT aaa, nombre, edad FROM lorem';

    db.all(query, (err, rows: Lorem[]) => {
      if (err) {
        reject(err);
      } else {
        const datos: Lorem[] = rows.map(row => ({
          info: row.info // Correctly assign the string value
        }));
        resolve(datos);
        console.log("hola")
        console.log(datos)
      }
    });
    db.close();
  });
}

export function obtenerTodosLosDatos(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydb.db');
    const query = 'SELECT * FROM lorem';

    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });

    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la conexión a la base de datos:', err.message);
      }
    });
  });
}
