import { IBug } from './../../core/services/models/api.model';
import { Pipe, PipeTransform } from '@angular/core';

const ITEMS_PER_PAGE: number = 10;

@Pipe({
  name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
  transform(data: IBug[], currentPage: number): IBug[] {
    return data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }
}
