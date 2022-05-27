import { ListControlsService } from './../../../../core/services/list-controls.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss'],
})
export class UserControlsComponent implements OnInit {
  public filter: string = '';
  public currentPage: number = 1;
  public lastPage: boolean = false;
  @Input() public filterByUser: boolean = false;

  constructor(
    private listControlsService: ListControlsService
  ) {}

  ngOnInit(): void {
    if (!this.filterByUser) {
      this.filter = this.listControlsService.getFilter;
      this.listControlsService.setFilter('');
    }

    this.listControlsService.lastPageSubject.subscribe(
      (value) => (this.lastPage = value)
    );
    this.listControlsService.currentPageSubject.subscribe(
      (value) => (this.currentPage = value)
    );
    this.listControlsService.filterSubject.subscribe(
      (value) => (this.filter = value)
    );
  }

  public onClick(deltaPage: number) {
    this.listControlsService.setCurrentPage(this.currentPage + deltaPage);
  }

  public onInput() {
    this.listControlsService.setFilter(this.filter);
  }

  public onResetFilter() {
    this.filter = '';
    this.onInput();
  }
}
