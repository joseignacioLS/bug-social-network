import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTrackerService {
  private user: string = '';
  constructor() {
    this.user = window.localStorage.getItem('user') ?? "";
  }

  public setUser(newUser: string): void {
    this.user = newUser;
    window.localStorage.setItem('user', newUser);
  }
  public getUser(): string {
    return this.user;
  }

  public isLogged(): boolean {
    return this.user !== ""
  }
}
