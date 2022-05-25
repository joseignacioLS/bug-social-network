import { IBug } from './../../../core/services/models/api.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public bug?: IBug;
  @Input() public edit: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
