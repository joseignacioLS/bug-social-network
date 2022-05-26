import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public size: number = 4;
  @Input() public fontSize: number = 2;
  @Input() public text: string = '';
  @Input() public isDisabled: boolean = false;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public onClick() {
    this.clicked.emit();
  }
}
