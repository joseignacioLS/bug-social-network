import { ListControlsService } from './../../../core/services/list-controls.service';
import { IBug } from './../../../core/services/models/api.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() public bug?: IBug;
  @Input() public edit: boolean = false;
  @Output() public stopEdittingEmitter: EventEmitter<void> = new EventEmitter();
  constructor(
    private router: Router,
    private listControlsService: ListControlsService
  ) {}

  public onStopEditting() {
    this.stopEdittingEmitter.emit();
  }

  public onClickTag(filter: string) {
    this.listControlsService.setFilter(filter);
    this.router.navigate(['/list']);
  }
}
