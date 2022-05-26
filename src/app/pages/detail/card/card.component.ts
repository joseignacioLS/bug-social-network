import { DetailFilterService } from './../../../core/services/detail-filter.service';
import { IBug } from './../../../core/services/models/api.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public bug?: IBug;
  @Input() public edit: boolean = false;
  @Output() public stopEdittingEmitter: EventEmitter<void> = new EventEmitter()
  constructor(
    private detailFilterService: DetailFilterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public onStopEditting() {
    this.stopEdittingEmitter.emit()
  }

  public onClickTag(filter: string) {
    this.detailFilterService.setFilter(filter)
    this.router.navigate(["/list"])
  }
}
