import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss']
})
export class UserControlsComponent implements OnInit {

  public filter: string = '';
  @Input() public currentPage: number = 0;
  @Output() public clickEmmitter: EventEmitter<number> = new EventEmitter();
  @Output() public filterEmmiter: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onClick(deltaPage: number) {
    this.clickEmmitter.emit(deltaPage);
  }

  public onInput() {
    this.filterEmmiter.emit(this.filter);
  }
}
