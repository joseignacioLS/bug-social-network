import { DetailFilterService } from './../../../core/services/detail-filter.service';
import { PageLimitService } from './../../../core/services/page-limit.service';
import { environment } from './../../../../environments/environment';
import { IBug } from './../../../core/services/models/api.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sharedlist',
  templateUrl: './sharedlist.component.html',
  styleUrls: ['./sharedlist.component.scss'],
})
export class SharedListComponent implements OnInit {
  public bugData?: IBug[];

  public currentPage: number = 1;
  public maxPage: number = 1;

  public filter: string = '';
  @Input() public filterByUser: boolean = false;

  public defautImg: string = environment.notFoundBug;

  constructor(
    private detailFilterService: DetailFilterService,
    private pageLimitService: PageLimitService
  ) {}

  ngOnInit(): void {
    if (!this.filterByUser) {
      this.filter = this.detailFilterService.getfilter;
      this.detailFilterService.setFilter('');
    }

    this.pageLimitService.pageSubject.subscribe((value) => {
      this.maxPage = value;
      if (this.currentPage > this.maxPage) {
        this.currentPage = Math.max(1, this.maxPage);
      }
    });
  }

  public onPageChange(deltaPage: number): void {
    this.currentPage += deltaPage;
  }

  public onFilterUpdate(newFilter: string) {
    this.filter = newFilter;
  }
}
