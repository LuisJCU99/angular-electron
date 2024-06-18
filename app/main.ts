import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { initializeDatabase, obtenerTodosLosDatos } from './database/database';
import * as sqlite3 from 'sqlite3';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More details at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
    initializeDatabase(); // Initialize the database
    // Uso de la función
    obtenerTodosLosDatos()
      .then(datos => {
        console.log('Datos:', datos);
      })
      .catch(error => {
        console.error('Error:', error);
      });    setTimeout(createWindow, 400);
      });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

// SQLite3 database setup
const db = new sqlite3.Database('mydb.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');
});

// IPC handlers for CRUD operations
ipcMain.handle('create-user', (event, user) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
});

ipcMain.handle('read-users', (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM lorem', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('update-user', (event, user) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, user.id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
});

ipcMain.handle('delete-user', (event, userId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("borrado")
      }
    });
  });
});
