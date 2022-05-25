import { Router } from '@angular/router';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface IUserResponse {
  message: string;
  status: string;
  data?: any;
}

interface IUser {
  _id:string
  username: string
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class UserTrackerService {
  public isLogged$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  public getUser(): IUser | null {
    const item: string | null = localStorage.getItem('user')
    if (item !== null) return JSON.parse(item) as IUser
    return item
  }

  public isLogged(): boolean {
    return this.getUser() !== null;
  }

  public login(username: string, password: string): void {
    this.http
      .post<IUserResponse>(`${environment.apiUrl}/user/login`, {
        username,
        password,
      })
      .subscribe((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.router.navigate(["/list"])
      });
  }

  public register(username: string, password: string): void {
    this.http
      .post<IUserResponse>(`${environment.apiUrl}/user/register`, {
        username,
        password,
      })
      .subscribe((res) => {
        this.router.navigate(["/login"])
      });
  }

  public logout():void {
    localStorage.removeItem("user");
  }
}
