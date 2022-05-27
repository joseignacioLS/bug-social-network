import { ListControlsService } from './../../../../core/services/list-controls.service';
import { UserTrackerService } from './../../../../core/services/user-tracker.service';
import { ApiService } from './../../../../core/services/api.service';
import { IBug, IArrayBugs } from './../../../../core/services/models/api.model';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public bugData?: IBug[];
  @Input() public filterByUser: boolean = false;

  public filter: string = '';
  public currentPage: number = 1;
  public lastPage: boolean = false;

  public loading: boolean = true;

  private filterSubscritiption?: Subscription;
  private currentPageSubscritiption?: Subscription;
  private loadingSubscritiption?: Subscription;

  constructor(
    private api: ApiService,
    private userTracker: UserTrackerService,
    private listControlsService: ListControlsService
  ) {}

  ngOnInit(): void {
    this.filter = this.listControlsService.getFilter;
    this.updateData();

    this.filterSubscritiption =
      this.listControlsService.filterSubject.subscribe((value) => {
        this.filter = value;
        this.updateData();
      });
    this.loadingSubscritiption =
      this.listControlsService.loadingSubject.subscribe((value) => {
        this.loading = value;
      });
    this.currentPageSubscritiption =
      this.listControlsService.currentPageSubject.subscribe((value) => {
        if (value === this.currentPage) return;
        this.currentPage = value;
        this.updateData();
      });
  }

  public updateData() {
    this.listControlsService.setLoading(true);

    this.api
      .getBug(this.filter, this.currentPage - 1, this.filterByUser)
      .subscribe((data: IArrayBugs) => {
        this.listControlsService.setLoading(false);
        this.listControlsService.setLastPage(data.isLast);
        if (data.data.length === 0 && this.currentPage > 1) {
          this.listControlsService.setCurrentPage(this.currentPage - 1);
        } else {
          this.bugData = [...data.data];
        }
      });
  }

  ngOnDestroy() {
    this.filterSubscritiption?.unsubscribe();
    this.currentPageSubscritiption?.unsubscribe();
    this.loadingSubscritiption?.unsubscribe();
  }
}
