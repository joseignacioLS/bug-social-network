import { IBug } from './../../core/services/models/api.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {
  transform(data: IBug[], filter: string): IBug[] {
    if (filter === '') return data.reverse();
    return data
      .reverse()
      .filter((bug) =>
        bug.name.toLowerCase().includes(filter.toLocaleLowerCase())
      );
  }
}
