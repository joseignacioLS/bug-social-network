import { PageLimitService } from './../../core/services/page-limit.service';
import { IBug } from './../../core/services/models/api.model';
import { Pipe, PipeTransform } from '@angular/core';

const ITEMS_PER_PAGE: number = 6;

@Pipe({
  name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
  constructor(private pageLimitService: PageLimitService) {}
  transform(data: IBug[], currentPage: number): IBug[] {
    const maxPage: number = Math.floor((data.length - 1) / ITEMS_PER_PAGE) + 1;
    this.pageLimitService.setLimit(maxPage);

    const page: IBug[] = data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return page;
  }
}
