import { IBug } from './../../core/services/models/api.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {
  transform(data: IBug[], filter: string): IBug[] {
    if (filter === '') return data;
    return data.filter(
      (bug) =>
        bug.name.toLowerCase().includes(filter.toLowerCase()) ||
        bug.tags?.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
