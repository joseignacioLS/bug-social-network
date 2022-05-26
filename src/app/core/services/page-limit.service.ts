import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageLimitService {
  // This service storages the maximum page number of
  // the current set of objects (after being filtered)
  // so the user cannot visit an empty page
  private maxPage: number = 1;
  public pageSubject: Subject<number> = new Subject();
  constructor() {}

  public setMaxPage(value: number) {
    this.maxPage = value;
    this.pageSubject.next(value);
  }

  get getMaxLimit(): number {
    return this.maxPage;
  }
}
