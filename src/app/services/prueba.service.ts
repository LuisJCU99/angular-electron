import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class pruebaService {
  constructor() { }

  // getDatos(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     ipcRenderer.send('get-datos');
  //     ipcRenderer.once('datos-obtenidos', (event, args) => {
  //       if (args.success) {
  //         resolve(args.data);
  //       } else {
  //         reject(args.error);
  //       }
  //     });
  //   });
  // }
}
