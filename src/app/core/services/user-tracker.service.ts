import { IUser, IUserResponse } from './models/user-tracker.models';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserTrackerService {
  public isLogged$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Retrieves the localStorage user data
   * @returns The current stored user data
   */
  public getUser(): IUser | null {
    const item: string | null = localStorage.getItem('user');
    if (item !== null) return JSON.parse(item) as IUser;
    return item;
  }

  /**
   * Checks if the user is logged in
   * @returns a boolean indicating whether the user is logged
   */
  public isLogged(): boolean {
    return this.getUser() !== null;
  }

  /**
   * Logs in the user
   * @param username the user username
   * @param password the user password
   * @returns An observable in the format IUserResponse
   */
  public login(username: string, password: string): Observable<IUserResponse> {
    return this.http
      .post<IUserResponse>(`${environment.apiUrl}/user/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          // if the login is successfull, the data is stored
          // in the localstorage and the user is redirected
          localStorage.setItem('user', JSON.stringify(res.data));
          this.isLogged$.next(true);
        })
      );
  }

  /**
   * Registers a new user
   * @param username user username
   * @param password user password
   * @returns An observable in the format IUserResponse
   */

  public register(
    username: string,
    password: string
  ): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(
      `${environment.apiUrl}/user/register`,
      {
        username,
        password,
      }
    );
  }

  /**
   * Logs out the current user
   */
  public logout(): void {
    localStorage.removeItem('user');
    this.isLogged$.next(false);
  }
}
