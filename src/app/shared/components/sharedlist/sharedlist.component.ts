import { PageLimitService } from './../../../core/services/page-limit.service';
import { environment } from './../../../../environments/environment';
import { IBug } from './../../../core/services/models/api.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sharedlist',
  templateUrl: './sharedlist.component.html',
  styleUrls: ['./sharedlist.component.scss'],
})
export class SharedListComponent {
  public bugData?: IBug[];

  public currentPage: number = 1;
  public filter: string = '';
  @Input() public filterByUser: boolean = false;

  public defautImg: string = environment.notFoundBug;

  constructor(private pageLimitService: PageLimitService) {}

  public onPageChange(deltaPage: number): void {
    if (
      this.currentPage + deltaPage <= 0 ||
      this.currentPage + deltaPage > this.pageLimitService.pageLimit
    ) {
      return;
    }

    this.currentPage += deltaPage;
  }

  public onFilterUpdate(newFilter: string) {
    this.filter = newFilter;
  }
}
