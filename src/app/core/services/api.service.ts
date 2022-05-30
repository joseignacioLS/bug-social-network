import { UserTrackerService } from './user-tracker.service';
import { environment } from './../../../environments/environment';
import { IBug, IArrayBugs } from './models/api.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private userTracker: UserTrackerService
  ) {}

  /**
   * Makes a get call to the api to obtain all the bug objects
   * @returns an array with all the bug objects in the DB
   */
  public getBug(
    filter: string = '',
    page: number = 0,
    isUser: boolean = false
  ): Observable<IArrayBugs> {
    const userData = this.userTracker.getUser();
    return this.http.get<IArrayBugs>(
      `${environment.apiUrl}/bugs?filter=${filter}&page=${page}${
        isUser ? '&user=' + userData?.username : ''
      }`
    );
  }

  /**
   * Makes a get call to the api to obtain a bug object with the provided id
   * @param id id of the desired object. Format string
   * @returns the bug object with the indicated id
   */
  public getBugById(id: string): Observable<IBug> {
    return this.http.get<IBug>(`${environment.apiUrl}/bugs/${id}`);
  }

  /**
   * Makes a post call to the api to generate a new bug object
   * @param data bug data
   * @returns the generated bug object
   */
  public createBug(data: FormData) {
    return this.http.post<IBug>(`${environment.apiUrl}/bugs`, data);
  }

  /**
   * Makes a put call to the api to modify the bug object with the provided id
   * @param id the id of the bug object to modify. Format string
   * @param newData the data to overwrite the old object data
   * @returns the modified bug object
   */

  public modifyBug(id: string, data: object) {
    return this.http.put<IBug>(`${environment.apiUrl}/bugs/${id}`, data);
  }

  /**
   * Makes a delete call to delete the object with the provided id
   * @param id the id of the bug to modify. Format string
   * @returns the delete object
   */
  public deleteBug(id: string): Observable<IBug> {
    return this.http.delete<IBug>(`${environment.apiUrl}/bugs/${id}`);
  }
}
