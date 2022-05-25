import { environment } from './../../../../../../environments/environment';
import { UserTrackerService } from './../../../../../core/services/user-tracker.service';
import { IBug } from './../../../../../core/services/models/api.model';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() public bug?: IBug;
  public isOwned: boolean = false;

  constructor(
    private userTracker: UserTrackerService
    ) {}

  ngOnInit(): void {
    if (this.bug?.image === '') {
      this.bug.image = environment.notFoundBug;
    }

    if (this.userTracker.getUser()?.username === this.bug?.user) {
      this.isOwned = true;
    }
  }
}
