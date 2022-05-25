import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageLimitService {

  private maxPage: number = 0;
  constructor() { }

  public setLimit(value: number) {
    this.maxPage = value
  }

  get pageLimit(): number {
    return this.maxPage
  }
}
