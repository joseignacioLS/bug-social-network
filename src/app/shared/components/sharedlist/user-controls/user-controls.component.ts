import { PageLimitService } from './../../../../core/services/page-limit.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss'],
})
export class UserControlsComponent implements OnInit {
  @Input() public filter: string = '';
  @Input() public currentPage: number = 1;

  @Input () public maxPage: number = 1;

  @Output() public clickEmmitter: EventEmitter<number> = new EventEmitter();
  @Output() public filterEmmiter: EventEmitter<string> = new EventEmitter();

  constructor(private pageLimitService: PageLimitService) {}

  ngOnInit(): void {
    this.pageLimitService.pageSubject.subscribe(
      (value) => (this.maxPage = value)
    );
  }

  public onClick(deltaPage: number) {
    this.clickEmmitter.emit(deltaPage);
  }

  public onInput() {
    this.filterEmmiter.emit(this.filter);
  }

  public onResetFilter() {
    this.filter = '';
    this.onInput();
  }
}
