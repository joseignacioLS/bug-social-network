import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListControlsService {
  private currentPage: number = 1;
  private lastPage: boolean = false;
  private filter: string = '';

  public lastPageSubject: Subject<boolean> = new Subject();
  public currentPageSubject: Subject<number> = new Subject();
  public filterSubject: Subject<string> = new Subject();

  constructor() {}

  get getCurrentPage(): number {
    return this.currentPage;
  }
  get getLastPage(): boolean {
    return this.lastPage;
  }
  get getFilter(): string {
    return this.filter;
  }

  public setCurrentPage(value: number) {
    this.currentPage = value;
    this.currentPageSubject.next(value);
  }
  public setLastPage(value: boolean) {
    this.lastPage = value;
    this.lastPageSubject.next(value);
  }
  public setFilter(value: string) {
    this.filter = value;
    this.filterSubject.next(value);
  }
}
