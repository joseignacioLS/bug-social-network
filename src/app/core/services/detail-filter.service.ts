import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailFilterService {
  // This service comunicates the detail page with the list page
  // When a tag in the list page is clicked the value of the tag
  // is stored in this service and passed to the list page after
  // being redirected. In the list page is used as query filter
  // and reseted to ""

  private filter: string = '';

  constructor() {}

  public setFilter(newFilter: string) {
    this.filter = newFilter;
  }

  get getfilter() {
    return this.filter;
  }
}
