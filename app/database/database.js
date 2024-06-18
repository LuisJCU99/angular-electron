"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTodosLosDatos = exports.getDatos = exports.initializeDatabase = void 0;
const sqlite3 = require("sqlite3");
function initializeDatabase() {
    sqlite3.verbose();
    const db = new sqlite3.Database('mydb.db');
    db.serialize(() => {
        db.run("CREATE TABLE if not exists lorem (info TEXT)");
        const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();
        db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
        });
    });
    db.close();
}
exports.initializeDatabase = initializeDatabase;
function getDatos() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('mydb.db');
        const query = 'SELECT aaa, nombre, edad FROM lorem';
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const datos = rows.map(row => ({
                    info: row.info // Correctly assign the string value
                }));
                resolve(datos);
                console.log("hola");
                console.log(datos);
            }
        });
        db.close();
    });
}
exports.getDatos = getDatos;
function obtenerTodosLosDatos() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('mydb.db');
        const query = 'SELECT * FROM lorem';
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
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
exports.obtenerTodosLosDatos = obtenerTodosLosDatos;
// ipcMain.handle('read-users', (event) => {
//   return new Promise((resolve, reject) => {
//     db.all('SELECT * FROM users', [], (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// });
//# sourceMappingURL=database.js.map