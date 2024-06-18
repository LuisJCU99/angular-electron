import { ipcMain } from 'electron';
import { getDatos } from './../database';

ipcMain.handle('get-datos', async () => {
  return getDatos();
});