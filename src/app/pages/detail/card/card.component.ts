import { IBug } from './../../../core/services/models/api.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public bug?: IBug;
  @Input() public edit: boolean = false;
  @Output() public stopEdittingEmitter: EventEmitter<void> = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  public onStopEditting() {
    this.stopEdittingEmitter.emit()
  }
}
