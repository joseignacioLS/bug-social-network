import { Router } from '@angular/router';
import { UserTrackerService } from './../../../core/services/user-tracker.service';
import { environment } from './../../../../environments/environment';
import { ApiService } from './../../../core/services/api.service';
import { IBug } from './../../../core/services/models/api.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sharedlist',
  templateUrl: './sharedlist.component.html',
  styleUrls: ['./sharedlist.component.scss'],
})
export class SharedListComponent implements OnInit {
  public bugData?: IBug[];

  public currentPage: number = 1;
  public filter: string = '';

  public defautImg: string = environment.notFoundBug;

  @Input() public filterByUser: boolean = false;

  constructor(
    private api: ApiService,
    private userTracker: UserTrackerService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.api.getBug().subscribe((bugs) => {
      this.bugData = bugs.filter((b) =>
        this.filterByUser
          ? this.userTracker.getUser() !== '' &&
            b.user === this.userTracker.getUser()
          : true
      );
    });
  }

  public onPageChange(deltaPage: number): void {
    if (this.currentPage + deltaPage <= 0) {
      return;
    }

    this.currentPage += deltaPage;
  }
}
