import { UserTrackerService } from './../../../../core/services/user-tracker.service';
import { ApiService } from './../../../../core/services/api.service';
import { IBug } from './../../../../core/services/models/api.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() public bugData?: IBug[];
  @Input() public filter: string = '';
  @Input() public currentPage: number = 0;
  @Input() public filterByUser: boolean = false;

  @Output() public filterEmitter: EventEmitter<string> = new EventEmitter();

  constructor(
    private api: ApiService,
    private userTracker: UserTrackerService
  ) {}

  ngOnInit(): void {
    this.api.getBug().subscribe((bugs: IBug[]) => {
      this.bugData = bugs
        .reverse()
        .filter((b) =>
          this.filterByUser
            ? this.userTracker.getUser() !== null &&
              b.user === this.userTracker.getUser()?.username
            : true
        );
    });
  }

  public onFilterReceive(filter: string) {
    this.filterEmitter.emit(filter);
  }
}
