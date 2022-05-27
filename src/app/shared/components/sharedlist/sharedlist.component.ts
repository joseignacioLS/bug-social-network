import { environment } from './../../../../environments/environment';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sharedlist',
  templateUrl: './sharedlist.component.html',
  styleUrls: ['./sharedlist.component.scss'],
})
export class SharedListComponent {
  @Input() public filterByUser: boolean = false;

  public defautImg: string = environment.notFoundBug;

  constructor() {}
}
