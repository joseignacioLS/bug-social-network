import { UserTrackerService } from './user-tracker.service';
import { environment } from './../../../environments/environment';
import { IBug, INewBug } from './models/api.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private userTracker: UserTrackerService
  ) {}
  public getBug(): Observable<IBug[]> {
    return this.http.get<IBug[]>(`${environment.apiUrl}/bugs`);
  }

  public getBugById(id: string): Observable<IBug> {
    return this.http.get<IBug>(`${environment.apiUrl}/bugs/${id}`);
  }

  public createBug(data: any) {
    // sacar todo esto a otra funcion
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const user = this.userTracker.getUser()?.username;

    const username = user ?? '';

    const newBug: INewBug = {
      user: username,
      name: data.name,
      createdAt: `${year}-${month}-${day}`,
      description: data.description,
      image: data.image,
      location: data.location,
      tags: '',
    };

    return this.http.post<IBug>(`${environment.apiUrl}/bugs`, newBug);
  }

  public modifyBug(id: string, newData: INewBug) {
    return this.getBugById(id).pipe(
      switchMap((oldData) => {
        return this.http.put<IBug>(`${environment.apiUrl}/bugs/${id}`, {
          ...oldData,
          ...newData,
          tags: '',
        });
      })
    );
  }

  public deleteBug(id: string): Observable<IBug> {
    return this.http.delete<IBug>(`${environment.apiUrl}/bugs/${id}`);
  }
}
