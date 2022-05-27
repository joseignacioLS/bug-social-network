import { Subscription } from 'rxjs';
import { ListControlsService } from './../../../../core/services/list-controls.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss'],
})
export class UserControlsComponent implements OnInit {
  public filter: string = '';
  public currentPage: number = 1;
  public lastPage: boolean = false;

  
  private filterSubscritiption? : Subscription;
  private lastPageSubscritiption? : Subscription;
  private currentPageSubscritiption? : Subscription;
  private loadingSubscritiption? : Subscription;

  public loading: boolean = false;

  constructor(private listControlsService: ListControlsService) {}

  ngOnInit(): void {
    this.filter = this.listControlsService.getFilter
    this.lastPageSubscritiption = this.listControlsService.lastPageSubject.subscribe(
      (value) => (this.lastPage = value)
    );
    this.currentPageSubscritiption =  this.listControlsService.currentPageSubject.subscribe(
      (value) => (this.currentPage = value)
    );
    this.filterSubscritiption = this.listControlsService.filterSubject.subscribe(
      (value) => (this.filter = value)
    );
    this.loadingSubscritiption = this.listControlsService.loadingSubject.subscribe(
      (value) => (this.loading = value)
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

  
  ngOnDestroy() {
    this.filterSubscritiption?.unsubscribe()
    this.currentPageSubscritiption?.unsubscribe()
    this.lastPageSubscritiption?.unsubscribe()
    this.loadingSubscritiption?.unsubscribe()
  }
}
