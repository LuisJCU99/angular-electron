import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class pruebaService {
  private api: any;

  constructor() {
    if ((window as any).api) {
      this.api = (window as any).api;
    } else {
      console.error('API is not available');
    }
  }

  createUser(user: { name: string; email: string }) {
    return this.api?.createUser(user);
  }

  readUsers() {
    return this.api?.readUsers();
  }

  updateUser(user: { id: number; name: string; email: string }) {
    return this.api?.updateUser(user);
  }

  deleteUser(userId: number) {
    return this.api?.deleteUser(userId);
  }
}
